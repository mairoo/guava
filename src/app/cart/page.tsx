'use client';

import {
  CartAgreements,
  CartItemDesktop,
  CartItemMobile,
} from '@/components/cart';
import { FlexColumn, TitledSection } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSyncCartMutation } from '@/store/cart/api';
import { clearCart } from '@/store/cart/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCreateOrderMutation } from '@/store/order/api';
import { Orders, PAYMENT_METHODS, PaymentMethod } from '@/types/order';
import { formatKRW } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface OrderFormData {
  paymentMethod: PaymentMethod;
  agreements: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    paymentAgreement: boolean;
  };
}

const schema = yup.object().shape({
  paymentMethod: yup
    .string()
    .oneOf(
      Object.keys(PAYMENT_METHODS) as PaymentMethod[],
      '결제 수단을 선택해주세요',
    )
    .required('결제 수단을 선택해주세요'),
  agreements: yup.object().shape({
    termsOfService: yup
      .boolean()
      .oneOf([true], '이용약관에 동의해주세요')
      .required('이용약관에 동의해주세요'),
    privacyPolicy: yup
      .boolean()
      .oneOf([true], '개인정보 처리방침에 동의해주세요')
      .required('개인정보 처리방침에 동의해주세요'),
    paymentAgreement: yup
      .boolean()
      .oneOf([true], '결제 진행에 동의해주세요')
      .required('결제 진행에 동의해주세요'),
  }),
});

const CartPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [createOrder] = useCreateOrderMutation();
  const [syncCart] = useSyncCartMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
  } = useForm<OrderFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentMethod: 'BANK_TRANSFER',
      agreements: {
        termsOfService: false,
        privacyPolicy: false,
        paymentAgreement: false,
      },
    },
    mode: 'onChange',
  });

  // 카트가 비어있을 때 폼 초기화
  useEffect(() => {
    if (cartItems.length === 0) {
      reset();
    }
  }, [cartItems.length, reset]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0,
  );

  const onSubmit = async (data: OrderFormData) => {
    try {
      // 폼 전체 유효성 검증 실행
      const isValid = await trigger();
      if (!isValid) {
        toast({
          variant: 'destructive',
          title: '입력 확인',
          description: '필수 항목을 모두 작성해주세요.',
        });
        return;
      }

      if (cartItems.length === 0) {
        toast({
          variant: 'destructive',
          title: '장바구니 확인',
          description: '장바구니에 상품을 담아주세요.',
        });
        return;
      }

      const orderRequest: Orders.CreateOrderRequest = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          subtitle: item.subtitle,
          code: item.code,
          listPrice: item.listPrice,
          sellingPrice: item.sellingPrice,
          quantity: item.quantity,
        })),
        paymentMethod: data.paymentMethod,
      };

      const result = await createOrder(orderRequest).unwrap();

      // 주문 성공 후 장바구니 비우기
      dispatch(clearCart());

      // 인증된 사용자의 경우 빈 장바구니로 서버 동기화
      if (isAuthenticated) {
        await syncCart([]);
      }

      toast({
        title: '주문이 완료되었습니다',
        description: '주문 내역에서 확인하실 수 있습니다.',
        duration: 1500,
        className: 'bg-blue-100 border border-blue-300 shadow-lg',
      });
      router.push(`/orders/${result.data.orderNo}`);
    } catch (error) {
      console.error('Failed to submit order:', error);
      toast({
        variant: 'destructive',
        title: '주문 실패',
        description: '잠시 후 다시 시도해주세요.',
      });
    }
  };

  const PaymentMethodsView = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? 'lg:hidden' : 'hidden lg:block'}>
      <Card className={!isMobile ? 'border-0 shadow-none' : ''}>
        <CardContent className="pt-6 p-3">
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                className={isMobile ? 'space-y-3' : 'grid grid-cols-3 gap-4'}
              >
                {Object.entries(PAYMENT_METHODS).map(([id, name]) => (
                  <div key={id} className="flex items-center space-x-3">
                    <RadioGroupItem
                      value={id}
                      id={`${isMobile ? 'mobile' : 'desktop'}-${id}`}
                    />
                    <Label
                      htmlFor={`${isMobile ? 'mobile' : 'desktop'}-${id}`}
                      className="cursor-pointer"
                    >
                      <span className="font-medium">{name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.paymentMethod && (
            <p className="text-sm text-red-500 mt-2">
              {errors.paymentMethod.message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="w-full">
      <FlexColumn>
        <TitledSection title="장바구니 / 주문결제" showBorder>
          {cartItems.length > 0 ? (
            <>
              <div className="hidden lg:block">
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <CartItemDesktop key={item.productId} item={item} />
                  ))}
                </div>
                <div className="flex justify-end p-3 bg-lime-50 rounded-b-lg">
                  <div className="text-sm font-semibold">
                    합계금액: {formatKRW.format(totalAmount)}
                  </div>
                </div>
              </div>
              <div className="lg:hidden space-y-2">
                {cartItems.map((item) => (
                  <CartItemMobile key={item.productId} item={item} />
                ))}
                <Card className="bg-lime-50">
                  <CardContent className="pt-6 p-3">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span>합계금액</span>
                      <span>{formatKRW.format(totalAmount)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">장바구니가 비어있습니다.</p>
            </div>
          )}
        </TitledSection>

        {cartItems.length > 0 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TitledSection title="입금 / 결제수단" showBorder>
              <PaymentMethodsView isMobile={false} />
              <PaymentMethodsView isMobile={true} />
            </TitledSection>

            <TitledSection title="주문 동의" showBorder>
              <Controller
                name="agreements"
                control={control}
                render={({ field }) => (
                  <CartAgreements
                    value={field.value}
                    onChangeAction={(key, value) =>
                      field.onChange({ ...field.value, [key]: value })
                    }
                    errors={errors.agreements}
                    isSubmitting={isSubmitting}
                  />
                )}
              />
            </TitledSection>

            <TitledSection title="주의사항" showBorder>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  주문 전 확인사항을 꼭 확인해주세요.
                </p>
              </div>
            </TitledSection>
          </form>
        )}
      </FlexColumn>
    </div>
  );
};

export default CartPage;

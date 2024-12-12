'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CartAgreements as ICartAgreements } from '@/types/cart';
import { useState } from 'react';

interface Props {
  value: ICartAgreements;
  onChangeAction: (key: keyof ICartAgreements, value: boolean) => void;
  errors?: {
    termsOfService?: { message?: string };
    privacyPolicy?: { message?: string };
    paymentAgreement?: { message?: string };
  };
  isSubmitting?: boolean;
}

export const CartAgreements = ({
  value,
  onChangeAction,
  errors = {}, // 기본값을 빈 객체로 설정
  isSubmitting,
}: Props) => {
  // 각 체크박스의 터치 여부를 추적
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {},
  );

  const agreements = [
    {
      id: 'termsOfService',
      title: '구매를 동의합니다. (전자상거래법 제8조 제2항)',
      description:
        '주문하실 상품, 가격, 배송정보, 할인정보 등을 확인하였으며, 구매에 동의합니다.',
      isRequired: true,
      isWarning: false,
    },
    {
      id: 'privacyPolicy',
      title: '본인 사용 목적으로 상품권을 구매합니다.',
      description:
        '대리구매 알바 또는 상품권 할인(페이백)을 미끼로 다른 사람이 상품권 구매를 요구했다면 100% 사기입니다.',
      isRequired: true,
      isWarning: true,
    },
    {
      id: 'paymentAgreement',
      title: '구글기프트카드는 절대 교환 및 환불불가 사실을 알고 구매합니다.',
      description:
        '구글에서 사용 오류로 이의제기 거절이 되어도 핀코인에 책임을 묻지 않습니다.',
      isRequired: true,
      isWarning: true,
    },
  ] as const;

  const handleCheckboxChange = (
    id: keyof ICartAgreements,
    checked: boolean,
  ) => {
    // 체크박스가 클릭되었음을 기록
    setTouchedFields((prev) => ({
      ...prev,
      [id]: true,
    }));
    onChangeAction(id, checked);
  };

  const isAllChecked = Object.values(value).every((checked) => checked);

  // 오류를 보여줄지 결정하는 함수
  const shouldShowError = (id: keyof ICartAgreements) => {
    return touchedFields[id] && errors[id]?.message;
  };

  return (
    <div className="space-y-4">
      <Card className="lg:border-0 lg:shadow-none">
        <CardContent className="pt-6 p-3 space-y-6">
          {agreements.map(
            ({ id, title, description, isRequired, isWarning }) => (
              <div key={id} className="flex items-start space-x-2">
                <Checkbox
                  id={id}
                  checked={value[id as keyof ICartAgreements]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      id as keyof ICartAgreements,
                      checked as boolean,
                    )
                  }
                  aria-invalid={!!shouldShowError(id as keyof ICartAgreements)}
                />
                <Label
                  htmlFor={id}
                  className="text-sm leading-relaxed cursor-pointer space-y-1"
                >
                  <span
                    className={`font-medium block ${isWarning ? 'text-red-500' : ''}`}
                  >
                    {title}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                  </span>
                  <span className="text-slate-500 block">{description}</span>
                  {shouldShowError(id as keyof ICartAgreements) && (
                    <span className="text-red-500 text-sm block">
                      {errors[id as keyof ICartAgreements]?.message}
                    </span>
                  )}
                </Label>
              </div>
            ),
          )}
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={isSubmitting || !isAllChecked}
        className="w-full py-6 text-lg text-white bg-slate-700 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⋯</span> 주문 처리중...
          </span>
        ) : (
          '주문완료'
        )}
      </Button>
    </div>
  );
};

export default CartAgreements;

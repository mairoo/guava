'use client';

import { Breadcrumbs, FlexColumn } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ArrowDown, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const breadcrumbItems = [
  { text: '홈', url: '/' },
  { text: '상품', url: '/products' },
  { text: '구글기프트카드' },
];

const productDescription = `
#### 상품권 안내

* 구글기프트카드
* 발행회사: 구글 코리아
* 홈페이지: [https://play.google.com/store](https://play.google.com/store)
* 고객센터: 080-234-0051
* 상품권 번호 형식: 알파벳/숫자 20자리 또는 알파벳/숫자 16자리
    * ##### \`1ABC-2DEF-3GHJ-4KLM-5NOP\`
    * ##### \`1ABC-2DEF-3GHJ-4KLM\`

##### 주의사항
* 일일  충전한도는 160만원입니다.
* **신규고객은 첫 구매로부터 48시간 동안 일일 50만원까지만 구매 가능합니다.**
* **BM-RGCH-06 오류**
    * [구글 결제 센터 페이지-설정](https://pay.google.com/payments/home#settings)에서 **국가/지역**을 **대한민국**으로 설정
    * 구글 고객센터 080-234-0051 전화문의
* **"이미 사용한 코드" 오류**
    * 구글 계정에 잔액이 올바르게 업데이트되지 않은 현상으로 30분 후 다시 확인
    * 구글 고객센터 080-234-0051 전화문의
* **구글코리아는 국내법을 따르지 않고 취소/환불을 지원하지 않아 계정 오류 발생 등 어떤 경우에도 환불 처리되지 않습니다.**
* **현재 등록할 수 없는 카드라는 오류 또는 사용 후 게임 내 아이템 충전 시 구글에서 추가 정보를 요구하는 경우가 발생해도 절대 환불 처리가 안 됩니다.**
* **구글은 이의제기를 해도 거절되면 그 이유를 알려주지도 않고 계속 거절하기 때문에 어떠한 대응도 안 됩니다.**

##### 사용방법
1. Android 스마트폰 또는 태블릿에서 Play 스토어 앱을 엽니다.<br>메뉴 아이콘을 탭하고 코드 사용을 선택합니다.<br>노트북에서는 [play.google.com/redeem](https://play.google.com/redeem)으로 이동합니다.
2. 기프트 코드를 입력합니다.
3. 쇼핑을 시작합니다. 기프트 카드 금액이 Google Play 잔액에 추가됩니다.

##### 이용약관
1. Google Play 기프트코드는 Google Payment Korea Limited에서 발행합니다.
2. [play.google.com/kr-card-terms](https://play.google.com/kr-card-terms)에서 약관 전문 및 개인정보처리방침을 확인하세요.
3. 만 14세 이상의 대한민국 거주자만 사용할 수 있습니다.
4. 코드의 금액을 적립(redeem)하려면 Google Payments 계정을 보유하고 있어야 하며 인터넷에 연결되어 있어야 합니다.
5. Google Play와 YouTube에서 조건에 맞는 상품 구매를 위해서만 사용할 수 있습니다.
6. 수수료나 유효기간은 없습니다.
7. 기기와 특정 구독 구매에는 사용할 수 없습니다.
8. 기타 제한사항이 적용될 수 있습니다.
9. **자연재해, 카드결함으로 인해 사용할 수 없거나 잔액이 액면가의 40% 미만인 경우에만 Google Play 문의를 통하여 환불이 가능합니다.**
10. 현금이나 기타 카드로의 전환, 신용 거래에의 이용, 재충전은 불가능합니다.
11. Google Play 이외의 잔액과 통합할 수 없으며, 재판매, 교환, 이전할 수 없습니다.
12. 코드 분실에 대해서는 책임지지 않습니다.
13. 고객 지원 및 잔액 확인을 위해서는 [support.google.com/googleplay/go/cardhelp](https://support.google.com/googleplay/go/cardhelp) 페이지에 방문하세요.
14. 이용약관: [g.co/playtermskr](https://g.co/playtermskr)
`;

const formatKRW = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  currencyDisplay: 'symbol',
});

const ProductInfo = () => (
  <div className="space-y-2">
    <h2 className="text-lg font-bold">상품 이름</h2>
    <p className="text-sm text-gray-600">
      정가: <span className="line-through">{formatKRW.format(47500)}</span>
    </p>
    <p className="text-sm text-gray-600">판매가 {formatKRW.format(45000)}</p>
    <div className="text-sm text-gray-600 flex items-center gap-1">
      할인율 <span className="text-red-500">9.00</span>
      <span className="text-red-500">%</span>
      <ArrowDown className="w-4 h-4 text-red-500" />
    </div>
  </div>
);

const ProductImage = () => (
  <div className="w-full relative aspect-[170/100]">
    <Image
      src="/placeholders/170x100.svg"
      alt="Product placeholder"
      fill
      sizes="100vw"
      className="object-contain"
      priority
    />
  </div>
);

const ProductDescription = () => (
  <Card className="w-full border-0 shadow-none">
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{productDescription}</ReactMarkdown>
    </div>
  </Card>
);

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
}: QuantitySelectorProps) => (
  <div className="space-y-2 w-full">
    <div className="text-sm">수량</div>
    <div className="w-full flex [&>*:not(:first-child)]:border-l-0">
      <Button
        variant="outline"
        className="rounded-r-none px-4"
        onClick={onDecrement}
      >
        -
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={onChange}
        className="text-center rounded-none w-full"
        min="1"
      />
      <Button
        variant="outline"
        className="rounded-l-none px-4"
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
    <Button
      variant="outline"
      size="sm"
      className="w-full border-gray-900 text-gray-900 hover:bg-white"
    >
      <ShoppingCart className="w-4 h-4" />
      담기
    </Button>
  </div>
);

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const productImage = <ProductImage />;
  const productInfo = <ProductInfo />;
  const quantitySelector = (
    <QuantitySelector
      quantity={quantity}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onChange={handleQuantityChange}
    />
  );
  const productDescription = <ProductDescription />;

  return (
    <FlexColumn spacing={2} marginY={2} className="w-full">
      <Breadcrumbs items={breadcrumbItems} marginY={1} />
      {isDesktop ? (
        <div className="grid grid-cols-[2fr,1fr] gap-8 w-full">
          {productDescription}
          <div className="space-y-8 w-full">
            {productImage}
            {productInfo}
            {quantitySelector}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {productImage}
          {productInfo}
          {quantitySelector}
          {productDescription}
        </div>
      )}
    </FlexColumn>
  );
};

export default ProductDetailPage;

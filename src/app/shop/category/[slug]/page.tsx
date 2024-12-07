import { FlexColumn } from '@/components/layout';
import { ProductGrid, ProductItemBuy } from '@/components/product';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const bestsellers = [
  {
    id: 1,
    name: '한게임상품권',
    discountRate: 0.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 2,
    name: '구글기프트카드',
    discountRate: 4.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 3,
    name: '아프리카별풍선',
    discountRate: 5.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 4,
    name: '에그머니',
    discountRate: 9.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 5,
    name: '플레이스테이션',
    discountRate: 7.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 6,
    name: '틴캐시',
    discountRate: 7.0,
    imageUrl: 'https://placehold.co/170x100',
  },
];

const warningContent = `
* 한국 구글플레이스토어의 게임과 상품만 구매할 수 있습니다.
* 지메일 계정의 국가 설정을 대한민국으로 해야 충전 및 결제할 수 있습니다.
* 일일 충전한도는 50만원입니다.
* **구글코리아는 국내법을 따르지 않고 취소/환불을 지원하지 않아 계정 오류 발생 등 어떤 경우에도 환불 처리되지 않습니다.**
* **현재 등록할 수 없는 카드라는 오류 또는 사용 후 게임 내 아이템 충전 시 구글에서 추가 정보를 요구하는 경우가 발생해도 절대 환불 처리가 안 됩니다.**
* **구글은 이의제기를 해도 거절되면 그 이유를 알려주지도 않고 계속 거절하기 때문에 어떠한 대응도 안 됩니다.**
`;

const CategoryDetailPage = () => {
  return (
    <FlexColumn spacing={2} marginY={2}>
      <Card className="w-full border border-yellow-200 bg-yellow-50 shadow-none p-1">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{warningContent}</ReactMarkdown>
        </div>
      </Card>
      <ProductGrid gap={2} py={0}>
        {bestsellers.map((product) => (
          <Link
            key={product.id}
            href={`/shop/product/1/${product.name}`}
            className="block"
          >
            <ProductItemBuy
              name={product.name}
              discountRate={product.discountRate}
              price={3550}
              imageUrl={product.imageUrl}
            />
          </Link>
        ))}
      </ProductGrid>
    </FlexColumn>
  );
};

export default CategoryDetailPage;

import { DottedList, FlexColumn } from '@/components/layout';
import React from 'react';

const CategoryPage = () => {
  return (
    <FlexColumn spacing={1}>
      <DottedList
        indent={2}
        /* border="border border-gray-200" rounded={true} backgroundColor="bg-gray-50"*/
      >
        <div>
          다른 사람으로부터 상품권 구매로 일부 또는 전체 금액을 입금 받기로
          했습니까?
        </div>
        <div>
          상품권 일부 또는 전체를 대리구매 하여 카카오톡 등 메신저로 다른
          사람에게 주기로 했습니까?
        </div>
        <div>
          네이트온/카카오톡 등 메신저에서 지인이 급한 돈이 필요하다고 상품권을
          요구했습니까?
        </div>
        <div>
          중고나라 또는 번개장터에서 물품대금을 현금 대신 상품권으로 요구
          받았습니까?
        </div>
      </DottedList>
    </FlexColumn>
  );
};

export default CategoryPage;

'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Props {
  onSubmit: () => Promise<void>;
}

export const CartAgreements = ({ onSubmit }: Props) => {
  const [agreements, setAgreements] = useState({
    purchase: false,
    personalInfo: false,
    giftCard: false,
  });

  const isAllAgreed = Object.values(agreements).every((value) => value);

  const handleSubmit = async () => {
    if (!isAllAgreed) {
      alert('모든 항목에 동의해주세요.');
      return;
    }
    await onSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="purchase"
            checked={agreements.purchase}
            onCheckedChange={(checked) =>
              setAgreements((prev) => ({
                ...prev,
                purchase: checked as boolean,
              }))
            }
          />
          <Label
            htmlFor="purchase"
            className="text-sm leading-relaxed cursor-pointer"
          >
            <span className="font-medium block">
              구매를 동의합니다. (전자상거래법 제 8조 제2항)
            </span>
            <span className="text-slate-500 block">
              주문하실 상품, 가격, 배송정보, 할인정보 등을 확인하였으며, 구매에
              동의합니다.
            </span>
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="personalInfo"
            checked={agreements.personalInfo}
            onCheckedChange={(checked) =>
              setAgreements((prev) => ({
                ...prev,
                personalInfo: checked as boolean,
              }))
            }
          />
          <Label
            htmlFor="personalInfo"
            className="text-sm leading-relaxed cursor-pointer"
          >
            <span className="font-medium text-red-500 block">
              본인 사용 목적으로 상품권을 구매합니다.
            </span>
            <span className="text-slate-500 block">
              대리구매 알바 또는 상품권 할인(페이백)을 미끼로 다른 사람이 상품권
              구매를 요구했다면 100% 사기입니다.
            </span>
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="giftCard"
            checked={agreements.giftCard}
            onCheckedChange={(checked) =>
              setAgreements((prev) => ({
                ...prev,
                giftCard: checked as boolean,
              }))
            }
          />
          <Label
            htmlFor="giftCard"
            className="text-sm leading-relaxed cursor-pointer"
          >
            <span className="font-medium text-red-500 block">
              구글기프트카드는 절대 교환 및 환불불가 사실을 알고 구매합니다.
            </span>
            <span className="text-slate-500 block">
              구글에서 사용 오류로 이의제기 거절이 되어도 판코인에 책임을 묻지
              않습니다.
            </span>
          </Label>
        </div>
      </div>

      <Button
        className="w-full py-6 text-lg text-white  bg-slate-700 hover:bg-slate-800"
        onClick={handleSubmit}
      >
        주문완료
      </Button>
    </div>
  );
};

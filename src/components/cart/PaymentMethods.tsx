'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PaymentMethod } from '@/types/cart';

interface Props {
  methods: PaymentMethod[];
  selectedMethod: string;
  onMethodChangeAction: (value: string) => Promise<void>;
}

export const PaymentMethods = ({
  methods,
  selectedMethod,
  onMethodChangeAction,
}: Props) => {
  return (
    <Card className="md:border-0 md:shadow-none">
      <CardContent className="pt-6 p-3">
        <RadioGroup
          value={selectedMethod}
          onValueChange={onMethodChangeAction}
          className="space-y-3"
        >
          {methods.map((method) => (
            <div
              key={method.id}
              className="flex items-center space-x-3 space-y-0"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <Label
                htmlFor={method.id}
                className="flex flex-col cursor-pointer"
              >
                <span className="font-medium">{method.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

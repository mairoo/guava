import { FlexColumn } from '@/components/layout';
import TitledSection from '@/components/layout/TitledSection';
import React from 'react';

const Home = () => (
  <FlexColumn spacing={4}>
    <TitledSection
      title="오늘의 최저가 상품권"
      showBorder={false}
      showSeparator
    >
      <p>섹션 내용입니다.</p>
    </TitledSection>
    <div>Second item</div>
    <div>Third item</div>
  </FlexColumn>
);
export default Home;

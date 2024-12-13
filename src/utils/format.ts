export const formatKRW = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  currencyDisplay: 'symbol',
});

export const formatUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'symbol',
});

export const formatAmount = (amount: number) =>
  new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    currencyDisplay: 'symbol',
  }).format(amount);

export const formatDateTime = (dateString: string) => {
  return dateString.replace('T', ' ').substring(0, 19);
};

export const truncateUserAgent = (userAgent: string, isMobile = false) => {
  const maxLength = isMobile ? 40 : 19; // 모바일에서는 더 긴 길이 허용
  return userAgent.length > maxLength
    ? `${userAgent.substring(0, maxLength - 1)}…`
    : userAgent;
};

export const truncateUUID = (uuid: string) => uuid.substring(0, 7) + '...';

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
    const date = new Date(dateString);

    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(/\./g, '-').replace(',', '');
};

export const truncateUserAgent = (userAgent: string, isMobile = false) => {
  const maxLength = isMobile ? 40 : 19; // 모바일에서는 더 긴 길이 허용
  return userAgent.length > maxLength
    ? `${userAgent.substring(0, maxLength - 1)}…`
    : userAgent;
};

export const truncateUUID = (uuid: string) => uuid.substring(0, 7) + '...';

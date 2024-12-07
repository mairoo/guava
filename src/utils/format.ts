export const formatDatetime = (datetime: string) => {
  return new Date(datetime)
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\./g, '-')
    .replace(',', '');
};

export const formatKRW = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  currencyDisplay: 'symbol',
});

export const truncateUserAgent = (userAgent: string, isMobile = false) => {
  const maxLength = isMobile ? 40 : 19; // 모바일에서는 더 긴 길이 허용
  return userAgent.length > maxLength
    ? `${userAgent.substring(0, maxLength - 1)}…`
    : userAgent;
};

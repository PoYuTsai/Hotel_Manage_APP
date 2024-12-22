interface CurrencyConfig {
  currency: string;
  symbol: string;
  locale: string;
}

export function getCurrencyConfig(language: string): CurrencyConfig {
  switch (language) {
    case 'th':
      return { currency: 'THB', symbol: '฿', locale: 'th-TH' };
    case 'zh-TW':
      return { currency: 'TWD', symbol: 'NT$', locale: 'zh-TW' };
    case 'zh-CN':
      return { currency: 'CNY', symbol: '¥', locale: 'zh-CN' };
    default:
      return { currency: 'USD', symbol: '$', locale: 'en-US' };
  }
}

export function formatCurrency(amount: number, language: string): string {
  const config = getCurrencyConfig(language);
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(value: number, language: string): string {
  return new Intl.NumberFormat(getCurrencyConfig(language).locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
}
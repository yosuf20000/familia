import React from 'react'

function MoneyDisplay({
    amount,
    currency = 'SAR',
    locale = 'en-SA',
    className = '',
  }) {

    const formatted = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
      }).format(amount);

      const colorClass = amount < 0 ? 'text-red-600' : 'text-green-600';

  return (
    <span className={`font-semibold ${colorClass} ${className}`}>
      {formatted}
    </span>
  )
}

export default MoneyDisplay

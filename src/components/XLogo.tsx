import React from 'react';

export default function XLogo({ className = 'w-4 h-4' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.901 1.153h3.68L14.54 11.076 24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932zm-1.29 19.62h2.039L6.486 3.118H4.298z" />
    </svg>
  );
}

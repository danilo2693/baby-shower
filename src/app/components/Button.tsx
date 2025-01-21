'use client';
import React from 'react';
import { ButtonType } from '../types';

export const Button = ({ children, text, url }: ButtonType) => {
  const goTo = () => {
    window.open(url);
  };
  return (
    <button
      type="button"
      className="text-white bg-persian-pink-700 hover:bg-persian-pink-800 focus:ring-4 focus:outline-none focus:ring-persian-pink-300 font-medium rounded-3xl text-lg sm:text-[0.75rem] px-5 sm:px-2 py-2.5 sm:py-0 text-center inline-flex items-center dark:bg-persian-pink-600 dark:hover:bg-persian-pink-700 dark:focus:ring-persian-pink-800"
      onClick={goTo}
    >
      {children}
      {text}
    </button>
  );
};

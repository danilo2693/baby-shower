'use client';
import React from 'react';
import { FaCopy } from 'react-icons/fa';

export const Clipboard = ({ text, url }: { text: string; url: string }) => {
  const custom_copy_message = text.replace('{{url}}', url);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(custom_copy_message);
  };
  return (
    <i onClick={copyToClipboard} className="cursor-pointer">
      <FaCopy />
    </i>
  );
};

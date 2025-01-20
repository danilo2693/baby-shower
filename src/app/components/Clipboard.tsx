'use client';
import React from 'react';
import { FaCopy } from 'react-icons/fa';

export const Clipboard = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `Hola, nos gustaria invitarte al Baby Shower de nuestra princesa Samantha, te dejó un enlace con más detalles: ${text}`
    );
  };
  return (
    <i onClick={copyToClipboard} className="cursor-pointer">
      <FaCopy />
    </i>
  );
};

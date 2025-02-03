'use client';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaCopy } from 'react-icons/fa';

const SWLibrary = withReactContent(Swal);

export const Clipboard = ({
  text,
  url,
  names
}: {
  text: string;
  url: string;
  names: string;
}) => {
  const Toast = SWLibrary.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const custom_copy_message = text
    .replace('{{names}}', names)
    .replace('{{url}}', url);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(custom_copy_message);
    Toast.fire({
      title: '¡Copiado!'
    });
  };

  return (
    <i onClick={copyToClipboard} className="cursor-pointer">
      <FaCopy />
    </i>
  );
};

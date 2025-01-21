'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LottieType } from '../types';

export default function Lottie({ src, style, onClick }: Readonly<LottieType>) {
  return (
    <DotLottieReact src={src} style={style} loop autoplay onClick={onClick} />
  );
}

'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Lottie({
  src,
  style,
  onClick
}: Readonly<{
  src: string;
  style?: any;
  onClick?: any;
}>) {
  return <DotLottieReact src={src} style={style} loop autoplay onClick={onClick} />;
}

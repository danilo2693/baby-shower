'use client';
import useMediaQuery from '@/hooks/useMediaQuery';
import Lottie from './Lottie';

export default function Baby({
  src
}: Readonly<{
  src: string;
}>) {
  const isMobile = useMediaQuery('(max-width: 576px)');

  return (
    <Lottie
      src={src}
      style={{
        position: 'absolute',
        left: isMobile ? '-130px' : '-160px'
      }}
    />
  );
}

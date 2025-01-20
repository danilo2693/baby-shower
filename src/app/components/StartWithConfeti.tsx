'use client';
import React from 'react';
import Lottie from './Lottie';
import { TConductorInstance } from 'react-canvas-confetti/dist/types';
import { Confeti } from './Confeti';

export const StartWithConfeti = () => {
  const [conductor, setConductor] = React.useState<TConductorInstance>();
  const onOnce = () => {
    conductor?.shoot();
  };
  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor);
  };
  return (
    <div className="h-24 w-24 cursor-pointer">
      <Confeti onInit={onInit} />
      <Lottie src="/star.lottie" onClick={onOnce} />
    </div>
  );
};

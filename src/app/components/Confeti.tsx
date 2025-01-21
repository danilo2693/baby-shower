'use client';
import React from 'react';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';
import { TConductorInstance } from 'react-canvas-confetti/dist/types';

export const Confeti = ({
  onInit
}: {
  onInit: ({ conductor }: { conductor: TConductorInstance }) => void;
}) => {
  return <Realistic autorun={{ speed: 0.3, duration: 3 }} onInit={onInit} />;
};

'use client';
import React from 'react';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';

export const Confeti = ({ onInit }) => {
  return <Realistic autorun={{ speed: 0.3, duration: 3 }} onInit={onInit} />;
};

import { useState, useCallback, useRef, useEffect } from 'react';

interface Use3DHoverReturn {
  transform: string;
  ref: React.RefObject<HTMLDivElement | null>;
  handleMouseMove: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleMouseLeave: () => void;
}

/* <section
          className="bg-white flex flex-col items-center p-4 shadow-2xl"
          style={{
            transform: transform,
            transition: 'transform 0.1s ease-out'
          }}
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        > */

// const { transform, ref, handleMouseMove, handleMouseLeave } = use3DHover();

const use3DHover = (): Use3DHoverReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('');
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleMouseMove = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!ref.current) return;

      const { width, height } = dimensions;
      const perspective = Math.max(width, height); // Use the larger dimension for perspective
      const { layerX, layerY } = evt.nativeEvent;

      const xRotation = ((layerX - width / 2) / width) * 20;
      const yRotation = -((layerY - height / 2) / height) * 20;

      const transformString = `
        perspective(${perspective}px)
        scale(1.1)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)`;

      setTransform(transformString);
    },
    [dimensions]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('');
  }, []);

  return { transform, ref, handleMouseMove, handleMouseLeave };
};

export default use3DHover;

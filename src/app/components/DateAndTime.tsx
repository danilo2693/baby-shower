import React from 'react';

export const DateAndTime = ({ generalData }) => {
  return (
    <span className="flex flex-col gap-1 items-center">
      <p className="text-persian-pink-400 pl-3">{generalData?.month}</p>
      <div className="flex gap-4 items-center justify-around">
        <span className="border-t-2 border-b-2">{generalData?.week_day}</span>
        <span className="text-persian-pink-400 text-4xl sm:text-2xl font-bold">
          {generalData?.day}
        </span>
        <span className="border-t-2 border-b-2">{generalData?.time}</span>
      </div>
      <p className="text-persian-pink-400 pl-3">{generalData?.year}</p>
    </span>
  );
};

import { useState } from 'react';

export default function PhotoProfile({ size = 200, image = '', name }) {
  const [fallback, setFallback] = useState(false);

  return (
    <div
      className="flex items-center justify-center overflow-hidden border border-black rounded-full aspect-square"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {fallback ? (
        <div
          className="flex items-center justify-center w-full h-full font-bold text-white uppercase bg-black select-none"
          style={{
            fontSize: `${size / 3}px`,
          }}
        >
          {name[0]}
        </div>
      ) : (
        <img
          src={image}
          className="object-cover w-full h-full"
          alt={name}
          onError={() => setFallback(true)}
        />
      )}
    </div>
  );
}

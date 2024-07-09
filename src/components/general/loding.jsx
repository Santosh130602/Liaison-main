import React from 'react';
import "../../App.css"

const LoadingComponent = () => {
  return (
    <div className="bg-zinc-900 p-4 rounded-md shadow-md">
    <div className='flex items-center mb-2 gap-6'>
      <div className='h-8 w-8 rounded-full bg-zinc-800 animate-wave-opacity mr-2' />
      <div className='h-6 w-32 rounded bg-zinc-800 animate-wave-opacity' />
    </div>
    <hr className='w-1/3' />
    <div className='flex gap-8 flex-col'>
      <div className='rounded h-32 bg-zinc-800 animate-wave-opacity' />
      <div className='rounded h-8 bg-zinc-800 animate-wave-opacity' />
      <div className='rounded h-8 bg-zinc-800 animate-wave-opacity' />
    </div>
  </div>
  );
};

export default LoadingComponent;

import NavBar from '@/components/all/NavBar';
import React from 'react';

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full relative">
      <NavBar />
      {children}
    </div>
  );
}

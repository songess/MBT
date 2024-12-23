'use client';
import React from 'react';
import { Button } from '../ui/button';

export default function NavBar() {
  const handleClick = () => {
    window.localStorage.removeItem('id');
    window.location.href = '/';
  };
  return (
    <div className="w-full absolute top-0 h-[50px] flex justify-end gap-4 items-center pr-4">
      <p className="text-bold">
        {window.localStorage.getItem('id')}님, 안녕하세요
      </p>
      <Button onClick={handleClick}>로그아웃</Button>
    </div>
  );
}

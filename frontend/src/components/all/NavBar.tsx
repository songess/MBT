'use client';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';

export default function NavBar() {
  const [id, setId] = React.useState<string | null>('');
  const handleClick = () => {
    localStorage.removeItem('id');
    location.href = '/';
  };

  useEffect(() => {
    setId(localStorage.getItem('id'));
  }, []);

  return (
    <div className="w-full absolute top-0 h-[50px] flex justify-end gap-4 items-center pr-4">
      <p className="text-bold">{id}님, 안녕하세요</p>
      <Button onClick={handleClick}>로그아웃</Button>
    </div>
  );
}

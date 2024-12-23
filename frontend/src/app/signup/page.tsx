'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState('');

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //TODO: 회원가입 로직 구현
    alert('회원가입이 완료되었습니다.');
    window.localStorage.setItem('id', id);
    router.push('/mytrip');
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            My Beautiful Trip(MBT)
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            회원가입 페이지
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="사용하실 ID를 입력하세요"
                className="text-lg p-6"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full text-lg p-6"
              onClick={handleSignUp}
            >
              회원가입
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

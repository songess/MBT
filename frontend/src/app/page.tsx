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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [members, setMembers] = useState<{ id: string; _id: string }[]>([]);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const checkMembers = members.map((member) => member.id);
    if (checkMembers.length !== 0 && checkMembers.includes(id)) {
      localStorage.setItem('id', id);
      router.push('/mytrip');
    } else {
      alert('아이디를 확인해주세요.');
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/login');
        const data = await response.json();
        setMembers(data.signUpUsers);
      } catch (e) {
        console.error(e);
        alert('회원정보를 불러오는데 실패했습니다(서버이슈).');
      }
    };
    fetchMembers();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            My Beautiful Trip(MBT)
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            당신의 여행계획을 관리해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="사용자 ID를 입력하세요"
                className="text-lg p-6"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full text-lg p-6"
              onClick={handleLogin}
            >
              로그인
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              아직 계정이 없으신가요?
            </p>
            <Link href="/signup">
              <Button variant="outline" className="w-full text-lg p-6">
                회원가입
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

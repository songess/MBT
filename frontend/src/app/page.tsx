import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">My Beautiful Trip(MBT)</CardTitle>
          <CardDescription className="text-lg mt-2">
            환영합니다! 당신의 여행계획을 관리해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Input 
                type="text" 
                placeholder="사용자 ID를 입력하세요" 
                className="text-lg p-6"
              />
            </div>
            <Button type="submit" className="w-full text-lg p-6">
              로그인
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              아직 계정이 없으신가요?
            </p>
            <Button variant="outline" className="w-full text-lg p-6">
              회원가입
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}


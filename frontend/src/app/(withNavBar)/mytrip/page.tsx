import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, PlusCircle } from 'lucide-react'
import Link from "next/link"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4 sm:p-8 flex justify-center items-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">나의 여행 플래너</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/travel-history" className="block">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader>
                <History className="w-12 h-12 mb-4 text-sky-600" />
                <CardTitle className="text-2xl">여행 기록</CardTitle>
                <CardDescription>이전에 계획했던 여행들을 확인</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  당신의 소중한 여행 기록들이 저장되어 있습니다. 
                  지난 여행들을 돌아보고 새로운 영감을 얻어보세요.
                </p>
                <Button className="w-full" variant="outline">
                  기록 보기
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/new-travel" className="block">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader>
                <PlusCircle className="w-12 h-12 mb-4 text-sky-600" />
                <CardTitle className="text-2xl">새로운 여행</CardTitle>
                <CardDescription>새로운 여행 계획을 시작</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  새로운 목적지를 향한 여행을 계획해보세요. 
                  당신의 다음 모험이 기다리고 있습니다.
                </p>
                <Button className="w-full">
                  여행 만들기
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}


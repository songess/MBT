'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trip } from '@/type/type';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// TODO: 예시 데이터
const DUMMYtrips: Trip[] = [
  {
    id: '1',
    title: '제주도 여행',
    fullTrip: [
      {
        date: '2024-01-01',
        oneDayDetail: [
          { startTime: '09:00', content: '성산일출봉 관광' },
          { startTime: '13:00', content: '섭지코지 산책' },
        ],
      },
      {
        date: '2024-01-02',
        oneDayDetail: [
          { startTime: '10:00', content: '한라산 등반' },
          { startTime: '16:00', content: '흑돼지 맛집 탐방' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: '부산 여행',
    fullTrip: [
      {
        date: '2024-02-01',
        oneDayDetail: [
          { startTime: '11:00', content: '해운대 해수욕장' },
          { startTime: '15:00', content: '광안리 다리 구경' },
        ],
      },
    ],
  },
];

export default function TravelHistory() {
  const [openTrips, setOpenTrips] = useState<Set<string>>(new Set());

  const toggleTrip = (tripId: string) => {
    const newOpenTrips = new Set(openTrips);
    if (newOpenTrips.has(tripId)) {
      newOpenTrips.delete(tripId);
    } else {
      newOpenTrips.add(tripId);
    }
    setOpenTrips(newOpenTrips);
  };

  const handleDelete = () => {
    // TODO: 여행 기록 삭제 로직 구현
    alert('삭제되었습니다.');
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">나의 여행 기록</h1>

        <div className="flex flex-col items-center gap-4">
          {DUMMYtrips.map((trip) => (
            <Collapsible
              key={trip.id}
              open={openTrips.has(trip.id)}
              onOpenChange={() => toggleTrip(trip.id)}
              className="w-full"
            >
              <Card className="w-full">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">{trip.title}</CardTitle>
                    {openTrips.has(trip.id) ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent>
                    {trip.fullTrip.map((dayPlan, index) => (
                      <div key={dayPlan.date} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Day {index + 1} -{' '}
                          {new Date(dayPlan.date).toLocaleDateString()}
                        </h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">시간</TableHead>
                              <TableHead>일정</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {dayPlan.oneDayDetail.map((record, recordIndex) => (
                              <TableRow key={recordIndex}>
                                <TableCell>{record.startTime}</TableCell>
                                <TableCell>{record.content}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ))}
                    <Button
                      className="w-[80px]"
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      삭제하기
                    </Button>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </main>
  );
}

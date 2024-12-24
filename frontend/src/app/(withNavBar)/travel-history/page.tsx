'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
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
import { useEffect, useState } from 'react';

export default function TravelHistory() {
  const [openTrips, setOpenTrips] = useState<Set<string>>(new Set());
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/travel');
        const data = await response.json();
        console.log(data.trips);
        setTrips(
          data.trips.filter(
            (trip: Trip) => trip.whose === localStorage.getItem('id')
          )
        );
      } catch (e) {
        console.error(e);
        alert('여행기록을 불러오는데 실패했습니다(서버이슈).');
      }
    };
    fetchTrips();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">나의 여행 기록</h1>
        <div className="max-w-md mx-auto mb-8">
          <Input
            type="text"
            placeholder="여행 제목으로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          {trips
            .filter((trip) => trip.title.includes(searchQuery))
            .map((trip) => (
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
                                <TableHead className="w-[100px]">
                                  시간
                                </TableHead>
                                <TableHead>일정</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {dayPlan.oneDayDetail.map(
                                (record, recordIndex) => (
                                  <TableRow key={recordIndex}>
                                    <TableCell>{record.startTime}</TableCell>
                                    <TableCell>{record.content}</TableCell>
                                  </TableRow>
                                )
                              )}
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

'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';
import { Trip, TripRecord } from '@/type/type';

export default function NewTravel() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [title, setTitle] = useState('');
  const [tripPlans, setTripPlans] = useState<{ [key: string]: TripRecord[] }>(
    {}
  );

  const handleAddRecord = (date: string) => {
    setTripPlans((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), { startTime: '', content: '' }],
    }));
  };

  const handleRemoveRecord = (date: string, index: number) => {
    setTripPlans((prev) => ({
      ...prev,
      [date]: prev[date].filter((_, i) => i !== index),
    }));
  };

  const handleUpdateRecord = (
    date: string,
    index: number,
    field: keyof TripRecord,
    value: string
  ) => {
    setTripPlans((prev) => ({
      ...prev,
      [date]: prev[date].map((record, i) =>
        i === index ? { ...record, [field]: value } : record
      ),
    }));
  };

  const getDatesInRange = (start: Date, end: Date) => {
    const dates: string[] = [];
    const current = new Date(start);

    while (current <= end) {
      dates.push(dayjs(current).format('YYYY-MM-DD'));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate || !title) {
      alert('시작일, 종료일, 제목을 모두 입력해주세요.');
      return;
    }
    let isError = false;

    const trip: Trip = {
      id: Date.now().toString(),
      whose: localStorage.getItem('id') || '',
      title,
      fullTrip: getDatesInRange(startDate, endDate).map((date) => ({
        date,
        oneDayDetail: (tripPlans[date] || []).map((record) => {
          if (!record.startTime || !record.content) {
            alert('시간과 일정을 모두 입력해주세요.');
            isError = true;
          }
          return {
            ...record,
          };
        }),
      })),
    };

    if (isError) {
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/travel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trip }),
      });
      if (!response.ok) {
        throw new Error('여행 계획 저장 실패');
      }
      alert('여행 계획이 저장되었습니다.');
      window.location.href = '/mytrip';
    } catch (e) {
      console.error(e);
      alert('여행 계획 저장에 실패했습니다.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">새로운 여행 계획</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  여행 제목
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="여행 제목을 입력하세요"
                  className="max-w-md"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    시작일
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !startDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate
                          ? dayjs(startDate).format('YYYY-MM-DD')
                          : '시작일 선택'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    종료일
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !endDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate
                          ? dayjs(endDate).format('YYYY-MM-DD')
                          : '종료일 선택'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) =>
                          startDate ? date < startDate : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {startDate &&
              endDate &&
              getDatesInRange(startDate, endDate).map((date, dayIndex) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    Day {dayIndex + 1} -{' '}
                    {dayjs(date).format('YYYY년 MM월 DD일')}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">시간</TableHead>
                        <TableHead>일정</TableHead>
                        <TableHead className="w-[100px]">삭제</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(tripPlans[date] || []).map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              type="time"
                              value={record.startTime}
                              onChange={(e) =>
                                handleUpdateRecord(
                                  date,
                                  index,
                                  'startTime',
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={record.content}
                              onChange={(e) =>
                                handleUpdateRecord(
                                  date,
                                  index,
                                  'content',
                                  e.target.value
                                )
                              }
                              placeholder="일정을 입력하세요"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveRecord(date, index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddRecord(date)}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    일정 추가
                  </Button>
                </div>
              ))}

            <Button onClick={handleSubmit} className="w-full" size="lg">
              여행 계획 저장
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export interface Trip {
  id: string;
  whose: string;
  title: string;
  fullTrip: TripDayPlan[];
}

export interface TripDayPlan {
  date: string;
  oneDayDetail: TripRecord[];
}

export interface TripRecord {
  startTime: string;
  content: string;
}


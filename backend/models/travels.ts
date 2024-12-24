import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

interface Trip {
  id: string;
  whose: string;
  title: string;
  fullTrip: TripDayPlan[];
}

interface TripDayPlan {
  date: string;
  oneDayDetail: TripRecord[];
}

interface TripRecord {
  startTime: string;
  content: string;
}

const TripRecordSchema = new mongoose.Schema(
  {
    startTime: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const TripDayPlanSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    oneDayDetail: {
      type: [TripRecordSchema],
      required: true,
    },
  },
  { _id: false }
);

const TripSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    whose: { type: String, required: true },
    title: { type: String, required: true },
    fullTrip: {
      type: [TripDayPlanSchema],
      required: true,
    },
  },
  { versionKey: false }
);

TripSchema.plugin(mongooseUniqueValidator);

export default mongoose.model<Trip>('Trip', TripSchema);

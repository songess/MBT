import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import Trip from '../models/travels';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('post');
  const { trip } = req.body;
  console.log(trip);
  const newTrip = new Trip(trip);
  try {
    await newTrip.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json('Trip created');
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('get');
  let trip: any;
  try {
    trip = await Trip.find({});
  } catch (err) {
    return next(err);
  }
  res.json({
    trips: trip.map((trip: { toObject: (arg0: { getters: boolean }) => any }) =>
      trip.toObject({ getters: true })
    ),
  });
});

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('delete' + req.params.id, typeof req.params.id);
    const { id } = req.params;
    try {
      await Trip.findOneAndDelete({ id: id });
    } catch (err) {
      console.log(err);
      return next(err);
    }
    res.status(200).json('Trip deleted');
  }
);

export default router;

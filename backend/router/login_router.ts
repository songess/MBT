import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import SignUpUser from '../models/signUpUsers';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('post');
  const { id } = req.body;
  const signUpUser = new SignUpUser({
    id,
  });
  try {
    await signUpUser.save();
  } catch (err) {
    return next(err);
  }
  res.status(201).json('User created');
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('get');
  let signUpUser: any;
  try {
    signUpUser = await SignUpUser.find({});
  } catch (err) {
    return next(err);
  }
  res.json({
    signUpUsers: signUpUser.map(
      (signUpUser: { toObject: (arg0: { getters: boolean }) => any }) =>
        signUpUser.toObject({ getters: true })
    ),
  });
});

export default router;

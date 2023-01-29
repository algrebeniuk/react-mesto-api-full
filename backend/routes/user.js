import express from 'express';
import {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} from '../controllers/user.js';
import {
  validationOfGettingUserId, validationOfAvatarUpdate, validationOfUserUpdate,
} from '../middlewares/user-joi-validation.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validationOfGettingUserId, getUser);
userRouter.patch('/me', validationOfUserUpdate, updateUser);
userRouter.patch('/me/avatar', validationOfAvatarUpdate, updateUserAvatar);

export default userRouter;

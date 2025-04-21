import { Router } from 'express';
import { userController } from '../../controllers/userController.js';
export const userRouter = Router();
userRouter.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
userRouter.route('/:userId')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
userRouter.route('/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.removeFriend);

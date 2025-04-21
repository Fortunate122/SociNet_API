import { Router } from 'express';
import { thoughtController } from '../../controllers/thoughtController.js';
export const thoughtRouter = Router();
thoughtRouter.route('/')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);
thoughtRouter.route('/:thoughtId')
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);
thoughtRouter.route('/:thoughtId/reactions')
    .post(thoughtController.addReaction);
thoughtRouter.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.removeReaction);

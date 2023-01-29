import express from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/card.js';
import { validationOfCardCreation, validationOfCardId } from '../middlewares/card-joi-validation.js';

const cardRouter = express.Router();

cardRouter.get('/', getCards);
cardRouter.post('/', validationOfCardCreation, createCard);
cardRouter.delete('/:cardId', validationOfCardId, deleteCard);
cardRouter.put('/:cardId/likes', validationOfCardId, likeCard);
cardRouter.delete('/:cardId/likes', validationOfCardId, dislikeCard);

export default cardRouter;

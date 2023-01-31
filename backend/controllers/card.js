import Card from '../models/card.js';
import BadRequest from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found-error.js';
import ForbiddenError from '../errors/forbidden-error.js';

export function getCards(req, res, next) {
  Card.find({}).sort({ createdAt: -1 })
    .then((card) => res.send(card))
    .catch(next);
}

export function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
}

export function deleteCard(req, res, next) {
  const { cardId } = req.params;
  Card.findById(cardId)
    .populate(['likes', 'owner'])
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Невозможно удалить чужую карточку'));
      }
      return card.remove().then(res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}

export function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}

export function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}

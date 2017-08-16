import joi from 'joi';

export const Book = joi.object().keys({
  title: joi.string().required(),
  author: joi.string().required()
}).description('Book');

export const BookAddCategory = joi.object().keys({
  category: joi.string().required()
});

export const BookUpdateAuthor = joi.object().keys({
  author: joi.string().required()
});
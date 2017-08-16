import { Book, BookAddCategory, BookUpdateAuthor } from '../schema';
import { BookModel } from '../models';

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: async (request, reply) => {
      try {
        const query = BookModel
          .find()
          .where('title').eq('my 2nd book')
          .populate('owner');

        const books = await query.exec();

        reply(books);
      } catch (error) {
        reply(error);
        throw error;
      }
    },
  },
  {
    method: 'GET',
    path: '/books/byTitle/{title}',
    handler: async (request, reply) => {
      const { title } = request.params;
      
      // BookModel
      //   .findByTitle(title)
      //   .then(books => reply(books))
      //   .catch(reply);

      const query = BookModel.find().byTitle(title);
        
      query.exec()
        .then(books => reply(books))
        .catch(reply);
    },
  },
  {
    method: 'POST',
    path: '/books',
    handler: (request, reply) => {
      const _book = request.payload;
      const owner = '5991b03358bc7ba512bdc32f';
      const categories = ['horror', 'drama'];
      const book = new BookModel(Object.assign({}, _book, { owner, categories }));

      book
        .save()
        .then(() => reply(book))
        .catch(reply);
    },
    config: {
      validate: {
        payload: Book
      }
    }
  },
  {
    method: 'PUT',
    path: '/books/{id}/category',
    handler: (request, reply) => {
      const { category } = request.payload;
      const { id } = request.params;
      
      BookModel.findById(id)
        .then(book => {
          if(!book) {
            return reply('Book not found').code(404);
          }

          return book.addCategory(category);
        })
        .then(() => reply('Category added'))
        .catch(reply)
    },
    config: {
      validate: {
        payload: BookAddCategory
      }
    }
  },
  {
    method: 'PUT',
    path: '/books/{id}/author',
    handler: (request, reply) => {
      const { author } = request.payload;
      const { id } = request.params;

      BookModel
        .findByIdAndUpdate(id, { author })
        .then(() => reply('Author updated'))
        .catch(reply)
    },
    config: {
      validate: {
        payload: BookUpdateAuthor
      }
    }
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: (request, reply) => {
      const { id } = request.params;
      
      BookModel.findByIdAndRemove(id)
        .then(book => {
          if(!book) {
            return reply('Book not found').code(404);
          }

          reply();
        })
        .catch(reply);
    }
  },
];

export default routes;

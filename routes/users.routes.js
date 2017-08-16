import { User } from '../schema';
import { UserModel } from '../models';

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: async (request, reply) => {
      
      console.log('will save user', request.payload);
      const user = new UserModel(request.payload);

      // try {
      //   await user.save();
      //   reply(user);
      // } catch (error) {
      //   reply(error);
      // };
      
      user
        .save()
        .then(() => reply(user))
        .catch(reply);
    },
    config: {
      validate: {
        payload: User
      }
    }
  },
];

export default routes;

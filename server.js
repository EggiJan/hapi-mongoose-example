import Hapi from 'hapi';
import db from './db';
import routes from './routes';

const server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    }
  },
});

server.connection({
  port: 1337
});

server.route(routes);

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
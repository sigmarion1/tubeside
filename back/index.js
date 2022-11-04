const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const chatHandler = require('./handlers/chatHandler');
const spaceHandler = require('./handlers/spaceHandler');
const videoHandler = require('./handlers/videoHandler');
const { instrument } = require('@socket.io/admin-ui');

// let server;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

const syncer = {
  syncList: {},
  doSync: function () {
    console.log(this.syncList);
    for (const spaceId in this.syncList) {
      if (this.syncList[spaceId].playerState === 1) {
        this.syncList[spaceId].currentTime += 1 * this.syncList[spaceId].playbackRate;
      }
      io.to(spaceId).emit('client:video:sync', this.syncList[spaceId]);
    }
  },
  initSync: function (spaceId) {
    this.syncList[spaceId] = {
      playerState: 0,
      currentTime: 0,
      playbackRate: 1,
    };
  },
  changeSync: function (spaceId, syncData) {
    this.syncList[spaceId] = syncData;
  },
  removeSync: function (spaceId) {
    delete this.syncList[spaceId];
  },
};

setInterval(() => syncer.doSync(), 1000);

io.on('connection', (socket) => {
  spaceHandler(io, socket, syncer);
  chatHandler(io, socket);
  videoHandler(io, socket, syncer);
});

instrument(io, {
  auth: false,
});

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  // server = app.listen(config.port, () => {
  server.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

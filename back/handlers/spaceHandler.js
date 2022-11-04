const { array } = require('joi');
const { spaceService } = require('../services');

module.exports = (io, socket, syncer) => {
  const joinSpace = async (userName, spaceId) => {
    if (userName === 'System') return;

    try {
      const space = await spaceService.getSpaceById(spaceId);

      if (!space) {
        return;
      }

      // const userList = [];

      const clients = io.sockets.adapter.rooms.get(spaceId);

      if (clients === undefined) {
        space.userList = [];
      } else {
        space.userList.filter((user) => clients.has(user.id));
      }

      // if (clients) {
      //   for (let client of clients) {
      //     const userName = io.sockets.sockets.get(client)?.userName;
      //     if (userName) {
      //       userList.push(userName);
      //     }
      //   }
      // }
      // if (userList.includes(userName)) {
      //   return;
      // }

      socket.userName = userName;
      socket.spaceId = spaceId;
      socket.join(spaceId);

      // userList.push(userName);
      space.userList.push({ name: userName, id: socket.id });

      if (space.userList.length <= 1) {
        syncer.initSync(spaceId);
        space.syncUser = userName;
        io.to(socket.spaceId).emit('client:chat:receive', {
          userName: 'System',
          body: `Manager has been changed to ${userName}`,
          time: new Date(),
        });
        io.to(socket.id).emit('client:space:youAreSyncUser');
      }

      socket.emit('client:space:joinSuccess', { userName, syncUser: space.syncUser });
      io.to(spaceId).emit('client:chat:receive', {
        userName: 'System',
        body: `${socket.userName} joined`,
        time: new Date(),
      });
      io.to(spaceId).emit('client:space:userChange');

      await space.save();
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect = async () => {
    if (!socket.spaceId) {
      return;
    }

    try {
      const space = await spaceService.getSpaceById(socket.spaceId);

      if (!space) {
        return;
      }

      const clients = io.sockets.adapter.rooms.get(socket.spaceId);

      if (clients === undefined) {
        space.userList = [];
      } else {
        space.userList.filter((user) => clients.has(user.id));
      }

      // const userList = [];

      // const clients = io.sockets.adapter.rooms.get(socket.spaceId);

      // if (clients) {
      //   for (let client of clients) {
      //     const userName = io.sockets.sockets.get(client)?.userName;
      //     if (userName) {
      //       userList.push(userName);
      //     }
      //   }
      // }

      // const userCount = userList.length;
      // const userName = socket.userName;

      // const userListIndex = space.userList.indexOf(userName);
      // if (userListIndex > -1) {
      //   space.userList.splice(userListIndex, 1);
      // }

      space.userList = space.userList.filter((user) => {
        return user.id !== socket.id;
      });

      if (space.userList.length === 0) {
        syncer.removeSync(socket.spaceId);
      } else if (space.syncUser === socket.userName) {
        const newSyncUser = space.userList[0];
        space.syncUser = newSyncUser.name;
        io.to(newSyncUser.id).emit('client:space:youAreSyncUser');
        io.to(socket.spaceId).emit('client:chat:receive', {
          userName: 'System',
          body: `Manager has been changed to ${newSyncUser.name}`,
          time: new Date(),
        });
      }

      await space.save();

      io.to(socket.spaceId).emit('client:space:userChange');
      io.to(socket.spaceId).emit('client:chat:receive', {
        userName: 'System',
        body: `${socket.userName} left`,
        time: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  socket.on('space:join', joinSpace);
  socket.on('disconnect', disconnect);
};

//   io.on('connection', (socket) => {
//     let joinedUser = false;

//     socket.on('join', (userName) => {
//       if (joinedUser) return;

//       if (userList.includes(userName)) return;

//       if (userName === 'System') return;

//       socket.userName = userName;
//       userList.push(userName);
//       addedUser = true;

//       console.log(userName + ' joined!!');

//       socket.emit('joinSuccess', {
//         userName: socket.userName,
//         userList,
//       });
//     });
//   });

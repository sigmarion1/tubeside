const { spaceService } = require('../services');

module.exports = (io, socket) => {
  const joinSpace = async (userName, spaceId) => {
    if (userName === 'System') return;

    try {
      const space = await spaceService.getSpaceById(spaceId);

      if (!space) {
        return;
      }

      const userList = [];

      const clients = io.sockets.adapter.rooms.get(spaceId);

      if (clients) {
        for (let client of clients) {
          const userName = io.sockets.sockets.get(client)?.userName;
          if (userName) {
            userList.push(userName);
          }
        }
      }
      if (userList.includes(userName)) {
        return;
      }

      socket.userName = userName;
      socket.spaceId = spaceId;
      socket.join(spaceId);
      userList.push(userName);

      if (userList.length <= 1) {
        space.syncUser = userName;
        io.to(socket.spaceId).emit('client:chat:receive', {
          userName: 'System',
          body: `Manager has been changed to ${userName}`,
          time: new Date(),
        });
      }

      socket.emit('client:space:joinSuccess', userName);
      io.to(spaceId).emit('client:chat:receive', {
        userName: 'System',
        body: `${socket.userName} joined`,
        time: new Date(),
      });
      io.to(spaceId).emit('client:space:userChange', userList);

      if (!space.isActive) {
        space.isActive = true;
      }

      space.userCount = userList.length;

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

      const userList = [];

      const clients = io.sockets.adapter.rooms.get(socket.spaceId);

      if (clients) {
        for (let client of clients) {
          const userName = io.sockets.sockets.get(client)?.userName;
          if (userName) {
            userList.push(userName);
          }
        }
      }

      const userCount = userList.length;
      space.userCount = userCount;

      if (userCount === 0) {
        space.isActive = false;
      } else if (space.syncUser === socket.userName) {
        const newSyncUser = userList[0];
        space.syncUser = newSyncUser;
        io.to(socket.spaceId).emit('client:chat:receive', {
          userName: 'System',
          body: `Manager has been changed to ${newSyncUser}`,
          time: new Date(),
        });
      }

      await space.save();

      io.to(socket.spaceId).emit('client:space:userChange', userList);
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

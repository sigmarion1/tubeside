module.exports = (io, socket) => {
  const sendChat = async (spaceId, userName, body) => {
    const time = new Date();

    io.to(spaceId).emit('client:chat:receive', { userName, body, time });
  };

  socket.on('chat:send', sendChat);
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

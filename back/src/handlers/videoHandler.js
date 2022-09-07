const { spaceService } = require('../services');
const axios = require('axios').default;

module.exports = (io, socket) => {
  const changeVideo = async (spaceId, videoId) => {
    const space = await spaceService.getSpaceById(spaceId);

    if (!space) {
      return;
    }

    try {
      const result = await axios.get(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
      const title = result?.data?.title;

      // if (!title) {
      //   return;
      // }

      space.currentVideoId = videoId;
      space.currentVideoName = title;

      await space.save();

      io.to(spaceId).emit('client:video:change');
      io.to(spaceId).emit('client:chat:receive', { userName: 'System', body: `Video Changed : ${title}`, time: new Date() });
    } catch (e) {
      console.log(e);
    }
  };

  const syncVideo = async (spaceId, syncData) => {
    io.to(spaceId).emit('client:video:sync', syncData);
  };

  socket.on('video:change', changeVideo);
  socket.on('video:sync', syncVideo);
};

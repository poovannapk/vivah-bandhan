const { Server } = require('socket.io');
const Message = require('./models/Message');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = await User.findById(decoded.id);
      if (!socket.user) return next(new Error('User not found'));
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    // Join user room
    socket.join(socket.user.id);

    // Listen for send_message
    socket.on('send_message', async ({ to, content }) => {
      const message = await Message.create({ from: socket.user.id, to, content });
      io.to(to).emit('receive_message', message);
      io.to(socket.user.id).emit('receive_message', message); // echo to sender
    });

    // Mark as seen
    socket.on('seen', async (messageId) => {
      await Message.findByIdAndUpdate(messageId, { seen: true });
    });
  });

  return io;
}

module.exports = setupSocket;

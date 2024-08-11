module.exports = (namespace) => {
    namespace.on('connection', (socket) => {
      console.log('Client connected to category realtime');
      
    });
  };
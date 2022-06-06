const app = require('./app');
// 4) Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});

const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});


dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env)
// console.log(app.get('env'));

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlPasrser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful'));

// 4) Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

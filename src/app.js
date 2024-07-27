const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//Routes
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/users.routes');
const newRouter = require('./routes/news.routes');

const categoryNews = require('./routes/category_news.routes');
const carouselRouter = require('./routes/carousel.routes');
const featuredRouter = require('./routes/featureds.routes');
const extrainfoRouter = require('./routes/xtraInfo.routes');
const carouselCompanion = require('./routes/carousel-companion.routes');

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(xss());
app.use(hpp());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour!',
});

app.use('/api/v1', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Use routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/news', newRouter);
app.use('/api/v1/category_news', categoryNews);
app.use('/api/v1/carousels', carouselRouter);
app.use('/api/v1/featureds', featuredRouter);
app.use('/api/v1/extraInfo', extrainfoRouter);
app.use('/api/v1/carouselCompanion', carouselCompanion);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

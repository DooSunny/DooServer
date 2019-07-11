/*

보여???
굿
이거 보면서 설명해줄게.
우선은 이 코드는 자동 생성 코드이고 내가 조금 수정한거.
중요한 코드만 소개할게

*/



const bodyParser = require('body-parser');
const { red, green, yellow } = require('chalk').default;
const express = require('express');
const expressErrorHandler = require('@kazaar/express-error-handler');
const helmet = require('helmet');
const morgan = require('morgan');


const { host, port, env } = require('./config');

const logger = console;
const { sequelize } = require('./models');
const router = require('./routes');

// 라우터를 만들고, 이 라우터를 express 에 전달해.
// 라우터는 어느 url 로 요청이 들어오면 어떻게 처리하겠다라는 정보가 담긴 애야. 함 들어가볼게.

const {
  httpErrorHandler, handleServerError, axiosErrorParser, handleSequelizeConnectionError,
} = expressErrorHandler(logger);

//
// ─── EXPRESS SERVER CREATION ────────────────────────────────────────────────────
//
const app = express();

//
// ─── AUTHORIZATION HANDLING ─────────────────────────────────────────────────────
//
var auth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  sequelize.models.users.findOne({
    where: {
      code: req.headers.authorization
    }
  }).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ error: 'No users founded!'});
    }
  }).catch((err) => {
    return res.status(403).json({ error: 'No users founded!'});
  });
}

// app.use(auth);

//
// ─── EXPRESS CONFIGURATION ──────────────────────────────────────────────────────
//
app.use(
  morgan('dev', {
    stream: {
      write: message => logger.info(message),
    },
  }),
);
app.use(bodyParser.json());
app.use(helmet());

//
// ─── SERVER ROUTES ──────────────────────────────────────────────────────────────
//
app.use(router);

//
// ─── GLOBAL ERROR HANDLING ──────────────────────────────────────────────────────
//
app.use(axiosErrorParser);
app.use(httpErrorHandler);

//
// ─── SERVER START ───────────────────────────────────────────────────────────────
//
app
  .listen(port, host, () => {
    logger.info(`${green('✓')} App is running at ${yellow(`${host}:${port}`)} in ${yellow(env)} mode`);

    sequelize
      .sync()
      .then(() => {
        logger.info(`${green('✓')} Successfully connected to ${yellow(sequelize.options.database)} database`);
        // demo();
      })
      .catch(handleSequelizeConnectionError);
  })
  .on('error', handleServerError);

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function demo() {
  sequelize.models.Users.create({
    code: makeid(7), 
    name: '김대용', 
    profilePictureUri:'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/32508762_606806973014817_9098627413276884992_o.jpg?_nc_cat=101&_nc_oc=AQm3rfLuQFqNXWTwzKesqM860EJMhtOTraxwhypoUE9-qU2t9z8I3liU9CF7_NEFcDk&_nc_ht=scontent-icn1-1.xx&oh=95bb70124ab9a7e5f4869b16316b3c74&oe=5D79DE07'
  }).then(function(user) {
    logger.info('Inserted!');
    logger.info(user);

    sequelize.models.PillInfo.create({
      time: new Date(),
      pillNumber: 10,
      remainEat: 5,
      code: user.code,
    }).then(function (pillInfo) {
      logger.info(pillInfo);
      sequelize.models.PillHistories.create({
        time: new Date(),
        morningPill: pillInfo.idx,
        lunchPill: pillInfo.idx,
        dinnerPill: pillInfo.idx,
        code: user.code,
      }).then(function (pillHistories) {
        logger.info(pillHistories);
      })
    })
  }).catch(function(err) {
    //TODO: error handling
    logger.info('Error occured while inserting the data!');
    logger.error(err);
  });  
}


var express = require('express');
var router = express.Router();

const { sequelize } = require('../models');

/* 
여기인데, 내가 아까 가르켜준 두개가 사용되지? 그냥 '/'랑 '/:~~'랑.
네
*/

// 그렇다면 이 라우터는 어떤 역할을 하고 
// 유저가 접속했는지?
router.get('/', function(req, res) { 
  sequelize.models.Users
    .findAll({
      include: [
        {
          model: sequelize.models.PillHistories,
          include: [
            {
              model: sequelize.models.PillInfo,
              as: 'morning',
            },
            {
              model: sequelize.models.PillInfo,
              as: 'lunch',
            },
            {
              model: sequelize.models.PillInfo,
              as: 'dinner',
            },
          ]
        }
      ]
    }) // <- 이게 무슨 역할을 할까? 모든 유저를 찾는역할처럼 보여여  - 빙고 그렇다면
    // 여기도 users 라는게 있지? [네] 얘도 똑같이 findAll 함수 내부에서 결과를 가지고 오면 여기에 users 인자에 넘겨줌. 이게 어떻게 이렇게 되는지 예를 간단하게 들어줄게.
    .then((users) => {    // <- 이게 뭔지는 아는가? 조건을 거는게 아닐까여 findAll을 하는데 then user를 찾아라? ㄲㅂ - 이거는 약간 생소한 개념이라 이게 뭐냐면
      // findAll 이 성공적으로 완료되었다면! 의 뜻을 가지고 있음. /아
      res.json(users)   // 그래서 여기서 리스폰스에 값을 전달해주는거겠즤
      // 근데 여기는 res.send 를 사용안하고, json 이라는걸 사용함 이게 뭘까. [가공된 데이터파일?] users 변수를 json 으로 가공해서 되돌려준다는 거임 ㅇㅇ 아 가공시켜서 json형식으로 만드는거에여?
      // ㅇㅇ json 으로 만드는 동시에 클라이언트한테 되돌려줌. 아 이해햇어여 
    })
    .catch((err) => { // 그러면 여기는 뭘까? 에러 잡는거? 약간 if문 느낌 [선언해야되여?]
      console.log(err);
      res.status(400).json(err);  // 맞으 findAll 하는데에, 오류가 발생을한다면, 여기로 들어오게됨. err 은 변수 맞어 이거는 어디서 넘겨주냐 하면
      // findAll 함수 내부에서 동작할 때 오류가 일어나면, 이 정보를 모아서 여기에 전달을 해주는데 err 인자로 전달해줌. [ㅇㅋ 이해햇어여] wawa
    }); 
});

var f = function(value) {
  console.log(value);
}

hello(f)

function hello(callback) {
  //만약에 여기에 엄청 오래걸리는 작업을 해.
  // 근데 노드는 쓰레드를 못돌려! 그러면 어떻게 되겠어, 다른기능들이 멈추겠죠
  // 그렇지, 그래서 cpu 가 하듯이 아 왔어? ㅎㅇ? ㅎㅇ
  // 
  callback('hehehehe');
}

// 이런식으로 이루어진거야.
// 굳이 이중으로 이용해여?

// 왜 그러냐 하면, 노드 js 는 모든게 비동기로 이루어져 있어. [아]

// 이 라우터는 어떤 역할을 하는지 예측해볼 수 있을까?
router.get('/:code', function(req, res) {
  sequelize.models.Users
    .find({
      where: {
        code: req.params.code
      },
      include: [
        {
          model: sequelize.models.PillHistories,
          include: [
            {
              model: sequelize.models.PillInfo,
              as: 'morning',
            },
            {
              model: sequelize.models.PillInfo,
              as: 'lunch',
            },
            {
              model: sequelize.models.PillInfo,
              as: 'dinner',
            },
          ]
        }
      ]
    })
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.status(400);
      res.json(err)
    });
});


/*
  파이썬과 노드랑 비슷한데, 모듈에 있어서는 조금 달라.

  파이썬에서는 파일 내에 모든 함수, 변수들을 참조할 수 있잖아?
  근데, 노드는 어느 함수, 변수를 내보낼지 결정할 수 있어.
  아래와 같이 사용함. module.exports = ~~~~

  아 이해했어여
*/
module.exports = router;
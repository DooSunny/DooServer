const { Router } = require('express');
const { NotFound } = require('http-errors');
const { sequelize } = require('../models');

const router = Router();
const users = require('./users');
const pillinfos = require('./pillinfos');

// 이게 API 라우트야. 아래의 링크로 들어오면, 함수를 실행하는데, 밑에 보면 use 라는게 있어.
// ─── API ROUTES ──────────────────────────────────────────────────────
//
// 보통은 이렇게 함.


/*

ㅎㅇ

자 그러면 아래의 결과가 어떻게 나올지 알거같으?
일딴 여기까지만 해도됭 / 이거만 

저거는 나중에 함 보자 일딴 '/' 이 링크만 함 보자. 그럼 왼쪽에 Shared Servers 보여? test-server 함 클릭해볼래?
화면 출력되는게 보여? ㅇㅇ 왼쪽에 없니?
ㅇㅋㅇㅋㅇㅋ ㅇㅋ 다시 한 번 접속해봐 그거 고쳤어 지웠어 다시 ㄲ
고로치 정말 간단하쥬? 그럼 한 번 아 잠깐만 실시간 새로고침 기능 넣고 올게
ㅇㅇ 그러면 34번째 줄에 send 하는걸 함 고쳐볼래? ㄲ 바꼈니? 대강 이런식으로 노드는 동작함 ㅇㅇ
음 그리고 보통 url 에서 데이터를 전달하잖아

/post/1 이렇게 이걸 한 번 해볼거야.

http://~~/asdf 이렇게 접속해볼래? 그냥 url 끝에 /(너가 치고싶은거) 해봐. 그럼 데이터가 들어오지? 이렇게 데이터를 가져올 수도 있고,
보통 http://~~/hello?bool=yes&as=231 이런식으로 오는것도 받아올 수 있음. 이거는 사용을 안할거야. 지금은 ㅇㅋ?

자 이제 기본적인건 됬고, 밑에 users 라우터로 넘어가보자.

밑에 우선 '/'에 들어오면 api server라고 메세지(?)를 전송하고
네

*/
// router.get('/:hello', (req, res) => res.status(200).send(req.params.hello));

// 그렇다면 얘는 어떻게 되는걸까? 맞어 그러면 아래꺼는 어떻게 처리될까 ㅇㅇ /users  라는 경로가 앞에 붙게됨 ㅇㅋ?
// '/' 이 들어오면 api server라고 보낸다? 아닌가 어렵네 , /user 경로를 사용한다 /ㅇㅋ
// 얘는 require 한거를 넣어주는데 users 를 함 들어가보면,

// 그래서 이런식으로 뭉팅이로 관리하거등, 유저 관련된건 유저 라우터 파일에, 약관련된건 약 라우터 파일 이런식 ㅇㅋ?
// ㅇㅋ

/*

내가 저번에 REST API 기법이라는걸 알려줬지? 기억안나나 맞아
우리는 REST API 를 지키면서 만들어 볼테야.
users 변수는 users.js 파일을 require 한 거야 옥희?




오키
*/
router.use('/users', users);
router.use('/pillInfos', pillinfos);


/*
  그럼 만약에 약 라우터를 만들었다.
  const yaks = require('./yaks');

  그럼 어케 쓰면될까
  router.use('/yaks', yaks); 그 냥 이렇게 하면되
  require 은 노드 문법이야, 약간 import 랑 비슷함. 굿
  require 하면 일딴 users.js 로 가보자.


  require가 뭐에여?r
  그럼 require쓰면 yaks 바로 작동하는거에여?
*/

//
// ─── 404 ERROR HANDLING ───────────────────────────────────────────────────────────────
//
router.use((req, res, next) => {
  const err = new NotFound('This route does not exist.');
  console.log('hello');
  
  next(err);
});



module.exports = router;

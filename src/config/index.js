const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const isDevelopment = !isProduction;

require('dotenv').config();


/* 
  여기도 마찬가지.
  근데 여기는 여러가지를 내보내지.
  딕셔너리를 사용해서 여러가지를 내보낼 수 있게됨.
  그럼 만약에 이 모듈을 require 했다치자.

  const index = require('index');

  그럼 아래에 host 를 require 한거에서 불러올려면 어떻게 참조하면 될까?
  index 에는 어떤게 들어올까? ㅇㅇ import index ㅇㅇ 맞으

  간단하게 하자면, require 하면 그냥 exports 한게 그대로 들어온다고 생각하며됨.

  index == {
    // Server options
    host: '0.0.0.0',
    port: 8080,

    // Application environment
    env,
    isProduction,
    isDevelopment,

    // Database config
    dbConfig: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  };
  인덱스 변수에는 저 값들이 들어오게 됨.
  const db = require('index');
  헷갈리니깐 이렇게 하자.
  db 에는 index.js 파일에서 exports 에 넣은 값을 그대로 가져와.
  ㅇㅇ 그렇지 exports 되어있는 함수, 변수 들만 db 에 대입됨.

  음 module.exports 는 일종의 변수임. 그래서 여기에는 오직 하나의 변수, 하나의 함수 밖에 넣어지지 않겠지?
  그래서 여러개를 넣기 위해서 딕셔너리를 사용함. ㅇㅋ?

  그러면 db 에서 0.0.0.0 값을 가져올려면 어케 쓰면될까?

  그럼 바로 밑에있는 module.exports의 값이 db에 대입되는거에여? 오키 이해했어여
  근데 무조건 exports 되어있는 모듈만 대입되여? 만약 다른 함수도 exports 되어있으면 다른 함수들도 개수 상관없이 전부다 함수가 대입되여?
  
  함수를 만들죠
  
  뭐 가능은 함. 근데 여기 노드에서는 함수 만들라면
  이렇게 하거나, 람다 함수 이렇게 하면됨. 람다 그냥 별거 없어 
  function () -> () => 이렇게 바뀐거 밖에 없다. ㅇㅋ
  이해 됨? ㅇㅇ 자 그러면,

  module.exports = () => {
    return "0.0.0.0"
  }
  
    
  
  const index에 index는 변수
  require('index')에 index는 index.js = import indes as index 같은 느낌



*/
module.exports = {
  // Server options
  host: '0.0.0.0',
  port: 8080,

  // Application environment
  env,
  isProduction,
  isDevelopment,

  // Database config
  dbConfig: {
    host: "localhost",
    username: "root",
    password: "1234",
    database: "pillwhen",
  },
};
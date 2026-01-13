require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRouter = require('./routers/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app';

// 환경변수 확인 (디버깅용)
console.log('MONGO_URI:', MONGO_URI ? '설정됨' : '설정 안됨');
console.log('MongoDB 연결 시도:', MONGO_URI);

mongoose.connect(MONGO_URI, {
  // 최신 mongoose 버전 호환성을 위한 옵션
})
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((error) => {
    console.error('MongoDB 연결 오류:', error);
  });

// Express 미들웨어
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
    res.json({ message: 'Todo Backend Server is running' });
  });

// 라우터 연결
app.use('/todos', todosRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}번에서 실행 중입니다.`);
});

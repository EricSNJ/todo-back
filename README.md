# Todo Backend API

Node.js와 Express를 사용한 Todo 애플리케이션 백엔드 API

## 기능

- 할일 생성 (POST /todos)
- 할일 목록 조회 (GET /todos)
- 할일 수정 (PUT /todos/:id)
- 할일 삭제 (DELETE /todos/:id)

## 설치 및 실행

### 로컬 개발

1. 의존성 설치
```bash
npm install
```

2. 환경변수 설정
`.env` 파일을 생성하고 다음 내용을 추가:
```
MONGO_URI=mongodb://localhost:27017/todo-app
```

3. 서버 실행
```bash
npm start
```

## Heroku 배포

### 환경변수 설정

Heroku CLI를 사용하여 MongoDB URI를 설정:

```bash
heroku config:set MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app
```

또는 Heroku 대시보드에서:
1. Heroku 대시보드 접속
2. 앱 선택
3. Settings 탭 클릭
4. Config Vars 섹션에서 "Reveal Config Vars" 클릭
5. Key: `MONGO_URI`, Value: `mongodb+srv://...` 추가

### 배포

```bash
git push heroku main
```

## API 엔드포인트

- `GET /` - 서버 상태 확인
- `GET /todos` - 할일 목록 조회
- `POST /todos` - 할일 생성
- `PUT /todos/:id` - 할일 수정
- `DELETE /todos/:id` - 할일 삭제

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할일 목록 조회 라우터
router.get('/', async (req, res) => {
  try {
    // MongoDB 연결 상태 확인
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: '데이터베이스 연결이 되지 않았습니다.',
        readyState: mongoose.connection.readyState 
      });
    }
    
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error('할일 목록 조회 오류:', error);
    res.status(500).json({ 
      error: '할일 목록 조회 중 오류가 발생했습니다.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 할일 생성 라우터
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    // title이 없으면 에러 반환
    if (!title) {
      return res.status(400).json({ error: 'title은 필수 입력 항목입니다.' });
    }

    // Todo 생성
    const todo = new Todo({
      title,
      description: description || ''
    });

    // 데이터베이스에 저장
    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('할일 생성 오류:', error);
    res.status(500).json({ error: '할일 생성 중 오류가 발생했습니다.' });
  }
});

// 할일 수정 라우터
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // 할일 찾기
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다.' });
    }

    // 수정할 데이터 업데이트
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    // 데이터베이스에 저장
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: '유효하지 않은 할일 ID입니다.' });
    }
    console.error('할일 수정 오류:', error);
    res.status(500).json({ error: '할일 수정 중 오류가 발생했습니다.' });
  }
});

// 할일 삭제 라우터
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 할일 찾기 및 삭제
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '할일이 삭제되었습니다.', todo });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: '유효하지 않은 할일 ID입니다.' });
    }
    console.error('할일 삭제 오류:', error);
    res.status(500).json({ error: '할일 삭제 중 오류가 발생했습니다.' });
  }
});

module.exports = router;

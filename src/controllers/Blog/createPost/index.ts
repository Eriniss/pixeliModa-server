import { Request, Response } from 'express';
import { BlogModel } from '../../../models';

/**
 * @function createPost
 * @description 새로운 블로그글 포스트를 'Blog' 컬렉션에 추가
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않음
 */
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    // Blog에서 사용할 데이터 구조분해 할당으로 추출
    const { title, content, author, tags } = req.body;

    // 블로그 데이터 검증
    if (!title || !content || !author) {
      res.status(400).send('Missing required fields');
    }

    // 새로운 포스트글 생성
    const newPost = new BlogModel({
      title,
      content,
      author,
      tags,
    });

    // 사용자 저장
    const savedUser = await newPost.save();

    res.status(201).json(savedUser);
    console.log('Blog post created successfully:', savedUser);
  } catch (error) {
    console.log('Error creating post: ', error);
    res.status(500).send('Server error');
  }
};

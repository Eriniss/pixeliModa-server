import { Request, Response } from 'express';
import { BlogModel } from '../../../models';

/**
 * @function getPost
 * @description 'Blog' 컬렉션에서 _id와 일치하는 문서를 찾아 그 결과를 클라이언트에게 응답으로 보냄
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않음
 */
export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogModel.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

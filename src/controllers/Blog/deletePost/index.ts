import { Request, Response } from 'express';
import { BlogModel } from '../../../models';

/**
 * @function deletePost
 * @description 'Blog' 컬렉션에서 _id와 일치하는 문서를 삭제하고 결과를 클라이언트에게 응답으로 보냄
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않음
 */
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost = await BlogModel.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      res.status(200).json({
        message: 'Post deleted successfully',
        data: deletedPost,
      });
    } else {
      // 문서가 존재하지 않을 경우 404 응답
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).send('Server error');
    res.status(500).json({ message: 'Server error', error });
  }
};

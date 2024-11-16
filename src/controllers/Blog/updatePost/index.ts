import { Request, Response } from 'express';
import { BlogModel } from '../../../models';

/**
 * @function updatePost
 * @description 요청된 ID와 일치하는 블로그 글을 업데이트하고 결과를 반환
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않음
 */
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    // 업데이트할 데이터 추출
    const { title, content, author, tags } = req.body;

    // 필수 필드 확인
    if (!title || !content || !author) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // 업데이트 시도
    const updatedPost = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        tags,
        updatedAt: new Date(), // updatedAt 필드를 최신화
      },
      { new: true, runValidators: true } // 업데이트 후 새 문서를 반환, 검증 실행
    );

    if (updatedPost) {
      // 성공적으로 업데이트된 문서 반환
      res.status(200).json({
        message: 'Post updated successfully',
        data: updatedPost,
      });
    } else {
      // 문서가 존재하지 않을 경우 404 응답
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    // 서버 오류 응답
    res.status(500).json({ message: 'Server error', error });
  }
};

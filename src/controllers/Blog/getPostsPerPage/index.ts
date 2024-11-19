import { Request, Response } from 'express';
import { BlogModel } from '../../../models';

/**
 * @function getPostsPerPage
 * @description 페이지 단위로 블로그 글을 'Blog' 컬렉션에서 가져옴
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않음
 */
export const getPostsPerPage = async (req: Request, res: Response): Promise<void> => {
  try {
    // 쿼리 또는 기본값을 이용하여 페이지 번호와 페이지당 아이템 개수 설정
    const page = parseInt(req.query.page as string, 10) || 1; // 기본 페이지: 1
    const limit = parseInt(req.query.limit as string, 10) || 10; // 기본 개수: 10
    const skip = (page - 1) * limit; // 스킵할 문서 수 계산

    const posts = await BlogModel.find()
      .sort({ createdAt: -1 }) // 최신 글부터 정렬(시간대 역순 정렬)
      .skip(skip)
      .limit(limit);

    // 전체 문서 개수 계산
    const totalPosts = await BlogModel.countDocuments();

    res.status(200).json({
      page,
      limit,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      posts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

import { Request, Response } from 'express';
import { UserModel } from '../../models/User';

/**
 * @function getUserInfo
 * @description 'User' 컬렉션에서 하나의 문서(첫 번쨰)를 찾아 그 결과를 클라이언트에게 응답으로 보냅니다.
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않습니다.
 */
export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.json(user); // password 필드가 자동으로 제거된 JSON을 응답합니다.
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

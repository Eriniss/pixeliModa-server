import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../models';
import { createJwt } from '../../../modules/';
import { compareHashedPassword } from '../../../modules/';

/**
 * @function signInUser
 * @description 이메일과 비밀번호를 사용하여 로그인하고 JWT 토큰을 반환
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않음
 */
export const signInUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 입력 필드 검증
    if (!email || !password) {
      res.status(400).send('Missing email or password');
      return;
    }

    // 이메일을 통해 사용자 찾기
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // 비밀번호 비교
    const isPasswordValid = await compareHashedPassword({ user, password });
    if (!isPasswordValid) {
      res.status(401).send('Invalid password');
      return;
    }

    // JWT 토큰 생성
    const tokenData = { _id: user._id, email: user.email, role: user.role };
    const token = createJwt(tokenData);

    // 로그인 성공 응답
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        theme: user.theme,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Server error');
  }
};

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../../models';

/**
 * @function loginUser
 * @description 이메일과 비밀번호를 사용하여 로그인하고 JWT 토큰을 반환합니다.
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않습니다.
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send('Invalid password');
      return;
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      {
        id: user._id,
        nickname: user.nickname,
        role: user.role,
      },
      process.env.JWT_SECRET || 'default_secret_key', // 환경변수로부터 JWT 시크릿 키를 가져옵니다.
      {
        expiresIn: process.env.JWT_EXPIRE_TIME || '24h', // 토큰 유효 기간 설정
      }
    );

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

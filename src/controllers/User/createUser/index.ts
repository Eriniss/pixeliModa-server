import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { UserModel } from '../../../models';
import { getHashedPassword } from '../../../modules';

dotenv.config();

/**
 * @function createUser
 * @description 새로운 사용자를 'User' 컬렉션에 추가합니다. 패스워드는 해싱하여 저장합니다.
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않습니다.
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 요청 본문에서 사용자 데이터를 추출합니다.
    const { nickname, email, password, role, theme, profile } = req.body;

    // 사용자 데이터 검증 (간단한 예시로 필수 필드만 검증)
    if (
      !nickname ||
      !email ||
      !password ||
      !role ||
      !theme ||
      !profile ||
      !profile.name ||
      !profile.bio
    ) {
      res.status(400).send('Missing required fields');
      return;
    }

    // 비밀번호 해싱 (기본값 10)
    const saltCount = parseInt(process.env.SALT_COUNT || '10');
    const hashedPassword = await getHashedPassword(password, saltCount);

    // 새로운 사용자 생성
    const newUser = new UserModel({
      nickname,
      email,
      password: hashedPassword, // 해싱된 비밀번호 저장
      role,
      theme,
      profile,
    });

    // 사용자 저장
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    console.log('User created successfully:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server error');
  }
};

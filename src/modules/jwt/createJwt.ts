import jwt from 'jsonwebtoken';
import { UserDocument } from '../../models/User';

type CreateJwtType = Pick<UserDocument, '_id' | 'email' | 'role'>;

/**
 * @desc json web token(jwt)를 생성합니다.
 * @param {CreateJwtType} props jwt에 담길 User 정보
 * @return {string} 문자열 형태의 jwt
 */
export const createJwt = (props: CreateJwtType): string => {
  const { _id, email, role } = props;

  // JWT 시크릿 키와 만료 시간 가져오기
  const secretKey = process.env.JWT_SECRET || 'jwt_secret_key';
  let expiresIn = process.env.JWT_EXPIRE_TIME || '24h';

  // expiresIn이 문자열로 설정된 경우, 유효성 검사
  if (isNaN(Number(expiresIn)) && !/^\d+[smhdw]$/.test(expiresIn)) {
    console.warn('Invalid JWT_EXPIRE_TIME format. Falling back to default.');
    expiresIn = '24h'; // 기본 값으로 설정
  }

  // 토큰 생성
  try {
    const token = jwt.sign(
      {
        id: _id,
        email: email,
        role: role,
      },
      secretKey,
      {
        expiresIn: expiresIn,
      }
    );
    return token;
  } catch (error) {
    console.error('Error creating JWT:', error);
    throw new Error('Error creating JWT');
  }
};

import bcrypt from 'bcrypt';
import { UserDocument } from '../../models/User';

// CompareHashedPasswordType 정의
type CompareHashedPasswordType = {
  user: UserDocument;
  password: string;
};
/**
 * @desc 응답으로 요청한 패스워드(password)와 DB에 저장된 User의 정보에 담긴 패스워드를 비교
 * @param {CompareHashedPasswordType} props
 * @return {Promise<boolean>} 패스워드가 일치할 시 true, 불일치 시 false를 각각 반환
 */
export const compareHashedPassword = (props: CompareHashedPasswordType): Promise<boolean> => {
  const { user, password } = props;

  // 비밀번호 비교
  return bcrypt.compare(password, user.password);
};

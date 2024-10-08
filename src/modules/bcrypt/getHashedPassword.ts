import bcrypt from 'bcrypt';

/**
 * 비밀번호를 해싱하여 반환
 * @param {string} pass - 해싱할 비밀번호
 * @param {number} [saltCount=10] - salt의 반복 횟수 (기본값은 10)
 * @returns {Promise<string>} 해싱된 비밀번호
 */
export const getHashedPassword = async (pass: string, saltCount: number = 10): Promise<string> => {
  try {
    // salt를 생성
    const salt = await bcrypt.genSalt(saltCount);
    // 비밀번호를 해싱
    const hash = await bcrypt.hash(pass, salt);

    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password');
  }
};

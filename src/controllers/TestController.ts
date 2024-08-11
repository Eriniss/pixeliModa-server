import { Request, Response } from 'express';
import { TestDocument } from '../models/TestDocument';

/**
 * @function getTestMessage
 * @description 'Test' 컬렉션에서 하나의 문서(첫 번쨰)를 찾아 그 결과를 클라이언트에게 응답으로 보냅니다.
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @returns {Promise<void>} 비동기 함수로서 Promise를 반환하며, 완료되면 아무 값도 반환하지 않습니다.
 */
export const getTestMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Test 컬렉션에서 첫 번째 문서를 찾습니다.
    const testDoc = await TestDocument.findOne();

    // 문서가 존재하면, 'test' 필드의 값을 클라이언트에 응답으로 보냅니다.
    if (testDoc) {
      res.send(testDoc.test);
    }
    // 문서가 존재하지 않으면, 404 상태와 함께 'No test document found' 메시지를 보냅니다.
    else {
      res.status(404).send('No test document found');
    }
  } catch (error) {
    // 서버에서 오류가 발생한 경우, 500 상태와 함께 'Server error' 메시지를 보냅니다.
    res.status(500).send('Server error');
  }
};

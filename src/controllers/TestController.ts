import { Request, Response } from 'express';
import TestDocument from '../models/TestDocument';

export const getTestMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const testDoc = await TestDocument.findOne();
    if (testDoc) {
      res.send(testDoc.test);
    } else {
      res.status(404).send('No test document found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

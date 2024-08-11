import mongoose, { Document, Schema } from 'mongoose';

/**
 * @type {Object} ITestDocument
 * @description Mongoose Document 타입을 확장하여 'test' 필드를 가진 타입을 정의합니다.
 */
export type ITestDocument = Document & {
  /**
   * @property {string} test - 필수 문자열 필드
   */
  test: string;
};

/**
 * @constant TestDocumentSchema
 * @type {Schema}
 * @description 'Test' 컬렉션을 위한 Mongoose 스키마를 정의합니다.
 */
const TestDocumentSchema: Schema = new Schema({
  test: {
    type: String,
    required: true,
  },
});

/**
 * @constant TestDocument
 * @type {mongoose.Model<ITestDocument>}
 * @description 'Test' 컬렉션에 대한 Mongoose 모델을 정의하고 생성합니다.
 */
export const TestDocument = mongoose.model<ITestDocument>('Test', TestDocumentSchema, 'test');

import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * @type {Object} Author
 * @property {string} userEmail - 유저 이메일 (필수)
 * @property {string} userNickname - 유저 닉네임 (필수)
 */
type Author = {
  userEmail: string;
  userNickname: string;
};

/**
 * @type {Object} BlogDocument
 * @description Mongoose Document 타입을 확장하여 'Blog' 필드를 가진 타입을 정의
 * @property {Types.ObjectId} _id - 객체 고유 ID
 * @property {string} title - 블로그 제목 (필수)
 * @property {string} content - 블로그 본문 내용
 * @property {Author} author - 작성자 정보 (필수)
 * @property {string[]} tag - 카태고리 태그
 * @property {Date} createdAt - 프로필 생성 시각 (필수)
 * @property {Date|null} updatedAt - 프로필 업데이트 시각(없을 시 undefined)
 */
export type BlogDocument = Document & {
  _id: Types.ObjectId;
  title: string;
  content: string | null;
  author: Author;
  tag: string[] | null;
  createdAt: Date;
  updatedAt: Date | null;
};

/**
 * @constant BlogSchema
 * @type {Schema}
 * @description 'Blog' 컬렉션을 위한 Mongoose 스키마를 정의
 */
const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
    author: {
      userEmail: {
        type: String,
        required: true,
      },
      userNickname: {
        data: String,
        required: true,
      },
    },
    tag: {
      type: [String],
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * @constant BlogModel
 * @type {mongoose.Model<BlogDocument>}
 * @description 'Blog' 컬렉션에 대한 Mongoose 모델을 정의하고 생성
 */
export const BlogModel = mongoose.model<BlogDocument>('Blog', BlogSchema, 'Blog');

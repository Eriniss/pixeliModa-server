import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * @type {Object} Avatar
 * @property {Buffer|null} data - 프로필 사진 데이터 (PNG, SVG 등)
 * @property {string|null} contentType - MIME 타입 (image/png, image/svg+xml 등)
 */
type Avatar = {
  data?: Buffer;
  contentType?: string;
};

/**
 * @type {Object} Profile
 * @property {string} name - 실제 이름 (필수)
 * @property {Avatar} avatar - 프로필 사진 객체
 * @property {string|null} bio - 간단한 자기소개
 */
type Profile = {
  name: string;
  avatar?: Avatar;
  bio?: string;
};

/**
 * @type {Object} UserDocument
 * @description Mongoose Document 타입을 확장하여 'User' 필드를 가진 타입을 정의
 * @property {Types.ObjectId} _id - 객체 고유 ID (필수)
 * @property {string} nickname - 유저 닉네임 (필수)
 * @property {string} email - 유저 이메일 (필수)
 * @property {string} password - 유저 비밀번호 (필수)
 * @property {string} role - 유저 권한, "admin" 또는 "user" (필수)
 * @property {string} theme - 유저 테마, "dark" 또는 "light" (필수)
 * @property {Profile} profile - 유저 프로필 객체 (필수)
 * @property {Date} createdAt - 프로필 생성 시각 (필수)
 * @property {Date|null} updatedAt - 프로필 업데이트 시각 (없을 시 null)
 */
export type UserDocument = Document & {
  _id: Types.ObjectId;
  nickname: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  theme: 'dark' | 'light';
  profile: Profile;
  createdAt: Date;
  updatedAt?: Date;
};

/**
 * password 필드를 제외하는 변환 함수
 * @param {any} doc - Mongoose Document
 * @param {any} ret - 반환된 JSON 객체
 * @returns {any} - password 필드를 제외한 객체
 */
const removePasswordField = (doc: any, ret: any) => {
  delete ret.password;
  return ret;
};

/**
 * @constant UserSchema
 * @type {Schema}
 * @description 'User' 컬렉션을 위한 Mongoose 스키마를 정의
 */
const UserSchema: Schema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
    theme: {
      type: String,
      enum: ['dark', 'light'],
      required: true,
    },
    profile: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        data: {
          type: Buffer,
          default: null,
        },
        contentType: {
          type: String,
          default: null,
        },
      },
      bio: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true, // createdAt 및 updatedAt 자동 관리
    toJSON: { transform: removePasswordField },
    toObject: { transform: removePasswordField },
  }
);

/**
 * @constant UserModel
 * @type {mongoose.Model<UserDocument>}
 * @description 'User' 컬렉션에 대한 Mongoose 모델을 정의하고 생성
 */
export const UserModel = mongoose.model<UserDocument>('User', UserSchema, 'User');

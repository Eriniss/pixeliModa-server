import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * @type {Object} Avatar
 * @property {Buffer|undefined} data - 프로필 사진 데이터 (PNG, SVG 등)
 * @property {string|undefined} contentType - MIME 타입 (image/png, image/svg+xml 등)
 */

/**
 * @type {Object} Profile
 * @property {string} name - 실제 이름 (필수)
 * @property {Avatar} avatar - 프로필 사진 객체
 * @property {string|undefined} bio - 간단한 자기소개
 */

/**
 * @type {Object} UserDocument
 * @description Mongoose Document 타입을 확장하여 'User' 필드를 가진 타입을 정의
 * @property {Types.ObjectId} _id - 객체 고유 ID
 * @property {string} nickname - 유저 닉네임 (필수)
 * @property {string} email - 유저 이메일 (필수)
 * @property {string} password - 유저 비밀번호 (필수)
 * @property {string} role - 유저 권한, "admin" 또는 "user" (필수)
 * @property {string} theme - 유저 테마, "dark" 또는 "light" (필수)
 * @property {Profile} profile - 유저 프로필 객체 (필수)
 * @property {Date} createdAt - 프로필 생성 시각
 * @property {Date|undefined} updatedAt - 프로필 업데이트 시각(없을 시 undefined)
 */
export type UserDocument = Document & {
  _id: Types.ObjectId;
  nickname: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  theme: 'dark' | 'light';
  profile: {
    name: string;
    avatar: {
      data: Buffer | undefined;
      contentType: string | undefined;
    };
    bio: string;
  };
  createdAt: Date;
  updatedAt: Date | null;
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
        data: Buffer,
        contentType: String,
      },
      bio: {
        type: String,
        required: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // password 필드를 제외하는 transform 함수 설정
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      // toObject 메서드 사용 시에도 password 필드를 제외
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

/**
 * @constant UserModel
 * @type {mongoose.Model<UserDocument>}
 * @description 'User' 컬렉션에 대한 Mongoose 모델을 정의하고 생성
 */
export const UserModel = mongoose.model<UserDocument>('User', UserSchema, 'User');

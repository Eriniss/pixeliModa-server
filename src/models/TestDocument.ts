import mongoose, { Document, Schema } from 'mongoose';

export interface ITestDocument extends Document {
  test: string;
}

const TestDocumentSchema: Schema = new Schema({
  test: {
    type: String,
    required: true,
  },
});

const TestDocument = mongoose.model<ITestDocument>('Test', TestDocumentSchema, 'test');
export default TestDocument;

import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

const resultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    examination: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
    },
    passingYear: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    subjects: [subjectSchema],
    totalMarks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Result', resultSchema);
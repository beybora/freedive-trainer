import mongoose, { Schema, Document } from "mongoose";

interface GroupTrainingDocument extends Document {
  _id: mongoose.Types.ObjectId; 
  location: string;
  title: string;
  description: string;
  date: Date;
  diveNumber: number; 
  participantLimit: number;
  depth: number; 
  hasBuoy: boolean; 
  participants: mongoose.Types.ObjectId[];
}

const groupTrainingSchema = new Schema<GroupTrainingDocument>(
  {
    _id: mongoose.Types.ObjectId,
    location: String,
    title: String,
    description: String,
    date: Date,
    diveNumber: Number,
    participantLimit: Number,
    depth: Number,
    hasBuoy: Boolean,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const GroupTraining =
  mongoose.models.GroupTraining ||
  mongoose.model<GroupTrainingDocument>("GroupTraining", groupTrainingSchema);

export default GroupTraining;

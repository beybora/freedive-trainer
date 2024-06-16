import mongoose, { Schema, Document } from "mongoose";

interface GroupTrainingDocument extends Document {
  dateTime: Date;
  location: string;
  participants: string[];
  hasBuoy: boolean;
}

const groupTrainingSchema = new Schema<GroupTrainingDocument>(
  {
    location: String,
    dateTime: Date,
    participants: [String],
    hasBuoy: Boolean,
  },
  { timestamps: true }
);

const GroupTraining =
  mongoose.models.GroupTraining ||
  mongoose.model<GroupTrainingDocument>("GroupTraining", groupTrainingSchema);

export default GroupTraining;

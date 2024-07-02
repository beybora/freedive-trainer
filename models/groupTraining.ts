import mongoose, { Schema, Document } from "mongoose";

interface GroupTrainingDocument extends Document {
  location: string;
  title: string;
  description: string;
  date: Date;
  diveNumber: Number;
  participantLimit: Number;
  depth: Number;
  hasBuoy: Boolean;
  participants: mongoose.Types.ObjectId[];
}

const groupTrainingSchema = new Schema<GroupTrainingDocument>(
  {
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

groupTrainingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

groupTrainingSchema.set("toJSON", {
  virtuals: true,
});

const GroupTraining =
  mongoose.models.GroupTraining ||
  mongoose.model<GroupTrainingDocument>("GroupTraining", groupTrainingSchema);

export default GroupTraining;

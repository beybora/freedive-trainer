import mongoose, { Schema, Document } from "mongoose";

interface Dive {
  discipline: string;
  time: string;
  depth: string;
  mood: string;
}

interface SessionDocument extends Document {
  dives: Dive[];
}

const sessionSchema = new Schema<SessionDocument>(
  {
    dives: [
      {
        discipline: String,
        time: String,
        depth: String,
        mood: String,
      },
    ],
  },
  { timestamps: true }
);

const Session =
  mongoose.models.Session ||
  mongoose.model<SessionDocument>("Session", sessionSchema);

export default Session;

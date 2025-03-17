import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema(
  {
    source: String,  // Where the CSV came from
    timestamp: { type: Date, default: Date.now },
    data: mongoose.Schema.Types.Mixed, // Flexible data structure
  },
  { strict: false } // Allows variations in CSV structure
);

const Record = mongoose.model("Record", RecordSchema);
export default Record;

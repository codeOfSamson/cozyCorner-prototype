import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import Record from "../models/Record.js";

const processCsv = async (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const records = [];

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        records.push({ source: csvFilePath, data: row });
      })
      .on("end", async () => {
        await Record.insertMany(records);
        console.log(`✅ Imported ${records.length} records from`, path.basename(csvFilePath));
        resolve();
      })
      .on("error", reject);
  });
};

export default processCsv;

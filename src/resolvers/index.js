import Record from "../models/Record.js";
import fs from "fs";
import csvParser from "csv-parser";

const resolvers = {
  Query: {
    getAllRecords: async () => {
      return await Record.find();
    },
  },

  Mutation: {
    uploadCSV: async (_, { filePath }) => {
      try {
        const records = [];

        await new Promise((resolve, reject) => {
          fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => records.push(row))
            .on("end", resolve)
            .on("error", reject);
        });

        await Record.insertMany(records.map((data) => ({ source: filePath, data })));

        return "CSV Uploaded Successfully!";
      } catch (error) {
        console.error(error);
        throw new Error("CSV Upload Failed");
      }
    },
  },
};

export default resolvers;

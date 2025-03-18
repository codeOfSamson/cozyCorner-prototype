import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import connectDB from "./db.js";
import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import downloadZip from "./scripts/scraper.js";
import unzipFiles from "./scripts/unzipper.js";
import processCsv from "./scripts/processCsv.js";


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// GraphQL Server
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();
app.use("/graphql", express.json(), expressMiddleware(server));

app.post("/fetch-data", async (req, res) => {
    try {
      const zipPath = await downloadZip();
      const csvFiles = unzipFiles(zipPath);
  
      for (const file of csvFiles) {
        await processCsv(file);
      }
      console.log('Done!')
      res.json({ message: "Data fetched and saved successfully!" });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/graphql`));

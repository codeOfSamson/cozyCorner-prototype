import AdmZip from "adm-zip";
import fs from "fs-extra";
import path from "path";

const DOWNLOAD_DIR = path.join(process.cwd(), "downloads");

const unzipFiles = (zipPath) => {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(DOWNLOAD_DIR, true);
  console.log("✅ Unzipped files to:", DOWNLOAD_DIR);

  const csvFiles = fs.readdirSync(DOWNLOAD_DIR).filter(file => file.endsWith(".csv"));
  return csvFiles.map(file => path.join(DOWNLOAD_DIR, file));
};

export default unzipFiles;

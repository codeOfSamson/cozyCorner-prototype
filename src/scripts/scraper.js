import { chromium } from "playwright";
import fs from "fs-extra";
import path from "path";

const DOWNLOAD_DIR = path.resolve("./downloads");

// Ensure download directory exists
fs.ensureDirSync(DOWNLOAD_DIR);


const downloadZip = async (req, res) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();


    try {
        // 1. Go to the government website
        await page.goto("https://data.gov.tw/dataset/77051", { waitUntil: "load" });
    
        // 2. Search for the keyword
        // await page.fill("input[name='search']", keyword);
        // await page.click("button[type='submit']");
        // await page.waitForSelector(".search-results a");
    
        // 3. Click the first search result
        const buttons = await page.locator('button');
        // const count = await buttons.count();
        // console.log(`Total buttons found: ${count}`);
        
        // for (let i = 0; i < count; i++) {
        //   const text = await buttons.nth(i).textContent();
        //   console.log(`Button ${i}: ${text}`);
        // }
    
       //const bananna =  await buttons.nth(14).click()
        
    
        // 4. Click the download link
        const downloadPromise = page.waitForEvent("download");
        await buttons.nth(14).click()
        const download = await downloadPromise;
    
    
    // Save ZIP file
    const zipPath = path.join(DOWNLOAD_DIR, download.suggestedFilename());
    await download.saveAs(zipPath);
    console.log("Downloaded ZIP:", zipPath);
    
    // // Extract ZIP file
    // const zip = new admZip(zipPath);
    // zip.extractAllTo(DOWNLOAD_DIR, true);
    // console.log("ZIP extracted to:", DOWNLOAD_DIR);
    
    // // Find the first CSV file inside
    // const extractedFiles = fs.readdirSync(DOWNLOAD_DIR);
    // const csvFile = extractedFiles.find(file => file.endsWith(".csv"));
    // if (!csvFile) throw new Error("No CSV file found in ZIP");
    
    // const csvPath = path.join(DOWNLOAD_DIR, csvFile);
    // console.log("Found CSV:", csvPath);
    
    // // Read CSV and send response
    // const results = [];
    // fs.createReadStream(csvPath)
    //   .pipe(csv())
    //   .on("data", (data) => results.push(data))
    //   .on("end", () => res.json(results));
    
    
    
    
        
        // // 5. Save the file
        // const filePath = path.join(DOWNLOAD_DIR, download.suggestedFilename());
        // console.log(69, filePath)
        // await download.saveAs(filePath);
        // 6. Parse and return the file data
        // const fileData = await parseFile(filePath);
        // res.json({ fileName: path.basename(filePath), data: fileData });

        await browser.close();

        return zipPath;
    
      } catch (error) { 
        console.log('e', error.message
        )

      } finally {
        await browser.close();
      }
 








//   await page.goto("https://example.gov/dataset"); // Replace with actual URL
//   await page.fill("#searchBar", "keyword"); // Search input
//   await page.click("button[type='submit']");

//   await page.waitForSelector("a.download-link"); // Wait for results
//   const [download] = await Promise.all([
//     page.waitForEvent("download"),
//     page.click("a.download-link"), // Click the download link
//   ]);

//   const zipPath = path.join(DOWNLOAD_DIR, "data.zip");
//   await download.saveAs(zipPath);


};

export default downloadZip;

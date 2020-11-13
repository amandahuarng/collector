const { collector } = require("@themarkup/blacklight-collector");
const path = require("path");
const {join} = require("path");
const fs = require("fs");
const fsExtra = require('fs-extra')


module.exports.scrapeSource = scrapeSource;
async function scrapeSource(url) {
  const EMULATE_DEVICE = false;
 // Save the results to a folder
  let OUT_DIR = true;

  // The URL to test
  let URL = url;
  console.log("begin running:", url)
  const defaultConfig = {
    inUrl: `http://${URL}`,
    numPages: 2,
    headless: false,
    emulateDevice: EMULATE_DEVICE
  };
  const result = await collector(
    OUT_DIR
      ? { ...defaultConfig, ...{ outDir: join(__dirname, "demo-dir") } }
      : defaultConfig
  )
  if (OUT_DIR) {
    console.log(
      `For captured data please look in ${join(__dirname, "demo-dir")}`
    );
  }
  const pathToFile = join(__dirname, "demo-dir", "inspection.json")
  const folderName = join(__dirname, "compiled", URL)
  if (fs.existsSync(pathToFile)) {
    if (!fs.existsSync(folderName)) { // if the folder exists 
      fs.mkdirSync(folderName)
    }
    const pathToNewDestination = join(folderName, "inspection.json")
    fs.copyFileSync(pathToFile, pathToNewDestination, fs.constants.COPYFILE_EXCL);
    console.log("Successfully copied and moved to: ", pathToNewDestination)
  }
  else {
    console.log("could not find path: ", pathToFile)
  }
  const dir = join(__dirname, "demo-dir")
  fsExtra.emptyDirSync(dir)
  URL = null
  return null;

}

module.exports = scrapeSource;

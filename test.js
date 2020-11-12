const { collector } = require("@themarkup/blacklight-collector");
const path = require("path");
const { join } = require("path");
const fs = require("fs");

module.exports.scrapeSource = (async function scrapeSource(url) {
    const EMULATE_DEVICE = false;
    console.log("her", url)
    // Save the results to a folder
    let OUT_DIR = true;

    // The URL to test
    let URL = url;

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
    );
    if (OUT_DIR) {
        console.log(
            `For captured data please look in ${join(__dirname, "demo-dir")}`
        );
    }

    const folderName = join(__dirname, "compiled", URL)

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }

    const pathToFile = join(__dirname, "demo-dir", "inspection.json")
    const pathToNewDestination = join(folderName, "inspection.json")

    fs.copyFile(pathToFile, pathToNewDestination, function (err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully copied and moved the file!")
        }
    })




})();
//module.exports = {async function scrapeSource(url)}


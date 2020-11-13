var fs = require('fs')
var path = require('path')
var parse = require('csv-parse/lib/sync');

const neatCsv = require('neat-csv');
const scrapeSource = require('./blacklight.js');
var body = null

const filePath = path.join(__dirname, '/blacklight_remaining_test.csv');
// //loading data from the file
// var global_data = fs.readFileSync(filePath).toString();
// //the dataset
// const input = global_data;
// //calling the npm package and save to records
// const data = parse(input, {
//     columns: true,
//     skip_empty_lines: true
// });

// //map the output from csv-parse to the column
// const urls = data.map(dat => dat["mecha.cc"]);
// console.log(urls)

// urls.forEach(async (url) => {
//     const contents = await scrapeSource(url)
//     console.log("finished scraping ", url)
// })
var start = async function() {
    fs.readFile(filePath, async (error, data) => {
        try{
            const dataAsString = data.toString();
            const dat = parse(dataAsString, {
                        columns: true,
                        skip_empty_lines: true
            });

            //map the output from csv-parse to the column
            const urls = dat.map(da => da["music.yandex.ru"]);
            const length = urls.length;
            console.log(length)
            for (let h = 0; h < length; h++){
                url = urls[h]
                //console.log(url)
                const work = await scrapeSource(url)
                
            }
            
            // urls.forEach( async (url) => {
            //     access = await scrapeSource(url);
            //     console.log(access)
            //     // do something with item
            // });

            
        } catch (e){
            console.log(e)        }
    })};

start()






// async function getUrls() {}
//     let csv = await readFile(filePath);
//     //let urls = await Promise(csv);
//     console.log(urls)

//     return new Promise((resolve, reject) => {
//         scrapeSource(url, (result) => {
//             resolve(result);
//         })
//     })
// }

// getUrls()
/*******************
  Print Cronos Banner
   ******************/

module.exports = new Promise((resolve, reject) => {

    console.clear();
    console.log("\n");
    arr = [];
    bannerLength = 93;
    numberOfSpaces = process.stdout.columns - 93 > 1 ? (process.stdout.columns - 93) / 2 : false;
    if (numberOfSpaces) {
        for (i = 0; i <= numberOfSpaces; ++i)
        arr.push(" ");
        arr = arr.join('');
        let art = require('ascii-art');
        art.font(`${arr}Cronos`, 'alligator', 'bright_green', (stream) => {
            resolve(console.log(stream));
        });
    }
    else {
        numberOfSpaces = (process.stdout.columns - 8) / 2;
        for (i = 0; i <= numberOfSpaces; ++i)
        arr.push(" ");
        arr = arr.join('');
        resolve(console.log(`${arr}CRONOS`));
    }
});
const request = require('request');
const input_URL = process.argv[2];
const input_PATH = process.argv[3];
const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeToFile = function () {
  if (!fs.existsSync(input_PATH)) return console.log('Path does not exist!');

  rl.question('The file already exists. Do you want to overwrite? ', (answer) => {
    if (answer === 'y') {
      request(input_URL, (error, response, body) => {
        if (error){
          console.log('The URL entered was invalid. The program will now exit.');
          process.exit();
        };
        
        fs.writeFile(input_PATH, body, err => {
          if (err) return console.log('Oops! didn\'t write!', err);
          console.log(`Downloaded and saved ${body.length} bytes to ${input_PATH}`);
          process.exit();
        })
      });

    } else if (answer === 'n') {
      console.log('The program will now exit.');
      process.exit();

    } else {
      console.log('Invalid response. The program will now exit.');
      process.exit();
    };
  })
};

writeToFile();
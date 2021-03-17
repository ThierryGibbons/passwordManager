/*jshint esversion: 8 */
/*jshint node: true*/

const fs = require('fs'); //  import fs to read & write to files.

class saveAks { //  create a class to store functions

  //  save password function
  s(user, enc, pass, site) {
    //  open/ create file and append data to file
    fs.appendFile('./save/' + user + '.chur', '\n' + site + ': ' + enc, err => {
      if (err) {
        console.error(err); //  log error
      }
      //  done
    });
  }

}

module.exports.sPass = sPass; //  export class

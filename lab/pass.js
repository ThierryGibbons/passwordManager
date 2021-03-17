/*jshint esversion: 8 */
/*jshint node: true*/

//  TODO: add qrcode-generator
//  TODO: create html front-end

const sPass = require('./sPass');
const fs = require('fs');

const crypto = require('crypto'),
    argv = require("yargs").argv,
    resizedIV = Buffer.allocUnsafe(16),
    iv = crypto
      .createHash("sha256")
      .update("myHashedIV")
      .digest();
iv.copy(resizedIV);

//  start sPass
var sAks = new sPass.sPass();

if (argv.e && argv.key) {
    const key = crypto
        .createHash("sha256")
        .update(argv.key)
        .digest(),
        cipher = crypto.createCipheriv("aes256", key, resizedIV),
        msg = [];
        site = '';

    argv._.forEach( function (phrase) {
        msg.push(cipher.update(phrase, "binary", "hex"));
        site = phrase;
    });

    msg.push(cipher.final("hex"));
    var enc = msg.join("");

    if (argv.s) {
      if (argv.user) {
        sAks.s(argv.user, enc, argv.key, site);
      } else {
        sAks.s('doo', enc);
      }
      //  file saved
    }

} else if (argv.d && argv.key) {
    const key = crypto
        .createHash("sha256")
        .update(argv.key)
        .digest(),
        decipher = crypto.createDecipheriv("aes256", key, resizedIV),
        msg = [];

    argv._.forEach( function (phrase) {
        msg.push(decipher.update(phrase, "hex", "binary"));
    });

    msg.push(decipher.final("binary"));
    console.log(msg.join(""));
} else if (argv.r) {
    const key = crypto
        .createHash("sha256")
        .update(crypto.randomBytes(16))
        .digest(),
        cipher = crypto.createCipheriv("aes256", key, resizedIV),
        msg = [];

        argv._.forEach( function (phrase) {
          msg.push(cipher.update(phrase, "binary", "hex"));
        });

  msg.push(cipher.final("hex"));
  console.log(msg.join(""));
}

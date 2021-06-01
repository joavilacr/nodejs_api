// Use Express
const express = require('express');

// Gathers the file.json which contains the value to encrypt/decrypt
const jsonData = require('../file.json');

// Use to generate the encryption and decryption
const crypto = require('crypto');

// Variable of algorithm used to encrypt
const algorithm = "aes-256-cbc";

// Secret key needed to encrypt and decrypt the string
const key = "12345678123456781234567812345678"; //32 bites
  
function decrypting() {
    try {
        // Initialization Value required to encrypt
        const iv = "4e7554268521882a"; //16 bites
        // Obtain only the text to encrypt from the JSON file and conver it into string
        const string = JSON.stringify(jsonData);
        const encryptedtext = (JSON.parse(string)['password']);
        //console.log('encryptedtext:' + encryptedtext);

        let encryptedText = Buffer.from(encryptedtext, 'hex');
        //let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        const result = decrypted.toString();
        console.log("Decrypted message is: " + result);
        return result;

    } catch(e) {
        console.log("The decription method has failed");
        console.log("Please make sure the file.json is presented and follows this format:");
        console.log('         { "password": "ENCRYPTED VALUE" }');
        console.log("NOTE: Make sure the password value is already encrypted, otherwise there is nothing to decrypt! Doh!!!");
        return 1;
    }
};

// TO DO DECRYPTION UNDER ../decrypt //
function route_decrypt(){
    const decryptRouter = express.Router();
    // Specifies the route to access this module
    decryptRouter.route('/decrypt')
        .get((req, res) => {
            try {
                // Obtains only the value/password of the json file
                const string = JSON.stringify(jsonData);
                const inputvalue = (JSON.parse(string)['password']);
                console.log("Decrypting message: " + inputvalue);

                // Obtains the decription for the encrypted value
                const decrypted = decrypting();
                
                // Check if value being encrypted/decrypted is not 1 bc it means error and checking its encrypted value as well
                if ((decrypted ==  1 && inputvalue == "700ee313bd106beb45f1774fc41b83ac") || decrypted !=  1 ){
                    // Sending the information about the result decrypted in json format
                    res.json( 
                        { 
                            Input: inputvalue,
                            Output: decrypted, 
                            Status: 'Success', 
                            Message: 'Text has been Decrypted successfully',
                        });
                } else {
                    res.json( 
                        { 
                            Input: inputvalue,
                            Output: "", 
                            Status: 'Error', 
                            Message: 'There is nothing to decrypt yet',
                        });
                }

            } catch(e){
                console.log(e)
                res.json( 
                    { 
                        Input: inputvalue,
                        Output: "", 
                        Status: 'Error', 
                        Message: e.toString(),
                    });
            }
        });
    return decryptRouter;
}

module.exports = route_decrypt();
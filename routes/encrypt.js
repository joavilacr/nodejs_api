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


const fs = require('fs');
const fileName = '../file.json';

function encrypting() {
    try {
        // Initialization Value required to encrypt
        const iv = "4e7554268521882a"; //16 bites
        // Obtain only the text to encrypt from the JSON file and conver it into string
        const string = JSON.stringify(jsonData);
        const objectValue = (JSON.parse(string)['password']);
        //const objectValue = (JSON.parse([string])[0]);
        console.log("Value to encrypt: " + objectValue);

        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(objectValue);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        let encrypted_value = encrypted.toString('hex');
        jsonData.password = encrypted_value
        console.log("Saving encrypted string " + encrypted_value + " into " + fileName);

        fs.writeFileSync(fileName, JSON.stringify(jsonData, null, 2), function writeJSON(err) {
            if (err) {
                return console.log(err);
            }
            console.log('Saved file with value: ' + JSON.stringify(jsonData, null, 2));
        });

        return encrypted.toString('hex');

    } catch(e) {
        console.log("JSON file (file.json) to encrypt is not presented under the root directory");
        console.log("Please create it with the following format:");
        console.log('         { "password": "TEXT TO ENCRYPT HERE" }');
    }
};

// TO DO ENCRYPTION UNDER ../encrypt //
function route_encrypt(){
    const encryptRouter = express.Router();
    // Specifies the route to access this module
    encryptRouter.route('/encrypt')
        .get((req, res) => {
            try {
                // Obtains only the value/password of the json file
                const string = JSON.stringify(jsonData);
                const inputvalue = (JSON.parse(string)['password']);

                // Obtains the encryption for the value in the json
                const encrypted = encrypting();

                // Sending the information about the result encrypted in json format
                res.json( 
                    { 
                        Input: inputvalue,
                        Output: encrypted, 
                        Status: 'Success', 
                        Message: 'Text has been Encrypted successfully',
                    });

            } catch(e) {
                console.log(e);
                res.json( 
                    { 
                        Input: inputvalue,
                        Output: "", 
                        Status: 'Error', 
                        Message: e.toString(),
                    });
            }
        });
    return encryptRouter;
}

module.exports = route_encrypt();
const bcrypt = require("bcrypt");
const saltRounds = 10;


exports.hash = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(e, hash) {
            if (e){
                console.log("ERROR:: ", e.msg, e.stack);
                reject(e);
            }
            resolve(hash)
        });
    })
}

exports.compare = async (password, hashedPassword) => {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hashedPassword, function(e, res) {
            if (e) {
                console.log("ERROR:: ", e.msg, e.stack);
            } else {
                resolve(res);
            }
        });
    });
}
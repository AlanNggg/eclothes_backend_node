const path = require("path");
const fs = require("fs");

const createDirectory = (id, type, dirname) => {
    const dir = path.join(
        __dirname,
        `../public/photo/${type}/${id}/${!!dirname ? dirname : ""}`
    );
    fs.access(dir, (err) => {
        if (err) {
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        `${type}/${id}/${
                            !!dirname ? dirname : ""
                        } directory created successfully !`
                    );
                }
            });
        } else {
            console.log(
                `${type}/${id}/${
                    !!dirname ? dirname : ""
                } directory already exists !`
            );
        }
    });
    console.log(dir);
};

module.exports = { createDirectory };

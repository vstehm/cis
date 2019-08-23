const express = require('express');
const helper = require('../../helpers/helper');
const config = require('../../config/dev');
const fs = require('fs');

function getAndSaveImg(id) {
    return helper.get(config.source + id)
        .then(data=>{
            return helper.getImage(data.data.avatar)
        })
        .then(data=>{
            return new Promise(function(resolve,reject){
                fs.writeFile(config.upload + id, data, function(err) {
                    if(err) {
                        return reject(err);
                    }
                    console.log("File was saved!");
                    return resolve(data)
                });
            })

        })
        .then(data=>{
            return data
        })
}

module.exports = {
    getUserById(req, res) {
        return helper.get(config.source + req.params.id)
            .then(data=>{
                console.log(data);
                res.send(data)
            })
            .catch(err=>{
                res.status(400).send({error: err.message});
            })
    },
    getAvatarByUserId(req, res) {
        let path = config.upload + req.params.id;
        return new Promise(function(resolve,reject){
            fs.readFile(path, function(err, contents) {
                if(err) {
                    resolve(false);
                }
                resolve(contents);
            });
        })
            .then(data=>{
                if(!data) {
                    console.log("getAndSaveImg");
                    return getAndSaveImg(req.params.id)
                }
                return data
            })
            .then(data=>{
                let base64OfFile = data.toString('base64');
                res.send(base64OfFile)
            })
            .catch(err=>{
                res.status(400).send({error: err.message});
            })

    },
    deleteAvatarByUserId(req, res) {
        let path = config.upload + req.params.id;
        return new Promise(function(resolve,reject){
            fs.unlink(path, (err) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
            .then(data=>{
                res.send({data: "Success"})
            })
            .catch(err=>{
                res.status(400).send({error: err.message});
            })

    }
};
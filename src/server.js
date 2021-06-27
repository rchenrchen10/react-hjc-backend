import express from 'express';

// const express = require('express');

const server = express();
server.use(express.json());


const articleInfo = [
    { name: 'learn-react', upvotes: 0, comment:[] },
    { name: 'learn-node', upvotes: 0, comment:[] },
    { name: 'learn-thoughts-on-resumes', upvotes: 0, comment:[] },
]

server.get('/api/articles/:name', (req, res) => {
    const {name} = req.params;
    const info = articleInfo.find( a => a.name === name );
    if(info) {
        res.json(info);
    } else {
        res.sendStatus(404);
    }
})

server.post('/api/articles/:name/upvotes', (req, res) => {
    const {name} = req.params;
    const info = articleInfo.find( a => a.name === name );
    if(info) {
        info.upvotes +=1;
        res.json(info);
    } else {
        res.sendStatus(404);
    }
})

server.post('/api/articles/:name/comment', (req, res) => {
    const {name} = req.params;
    const {author, text} =  req.body;
    //console.log(comment);
    //console.log(typeof comment);
    //console.log(Object.prototype.toString.apply(comment));
    
    const info = articleInfo.find( a => a.name === name );
    if(info) {
        info.comment.push({author, text})
        res.json(info);
    } else {
        res.sendStatus(404);
    }
})

server.get('/hello', (req, res) =>{
    res.send('Hello');
})

server.get('/upvotes', (req, res) =>{
    res.send('{upvotes: 5}')
})

server.post('/articles', (req, res) => {
    console.log(req.body);
    res.send('Successeee!');
})

server.get('/articles/:name', (req, res) => {
    console.log(req.params);
    res.send("found it")
})

server.listen(8080, ()=>console.log('serrver is running at port 8080'));
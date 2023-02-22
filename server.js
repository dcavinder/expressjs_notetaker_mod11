const express = require('express');
const path = require('path');
const uid = require('uid')
let notes = require('./db/db.json')
const PORT = process.env.PORT || 3001;

const app = express();
const numId = Math.floor(Math.random()*90000) + 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//displays notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//displays index.html
app.get('/index.html', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//gets notes
app.get('/api/notes', (req,res) => {
    res.json(notes)}
);

//Creates new note
app.post('/api/notes', (req,res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: numId,
    }
    notes.push(newNote)
    res.json(200)
});

//locates a note with a specific unique id to remove a note from the array
app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id != req.params.id)
    res.json(notes)
})

app.listen(process.env.port || 3001);


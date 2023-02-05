
const express = require('express');
const path = require('path');
const uid = require('uid')
let notes = require('./db/db.json')
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

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
        id: uid(),
    }
    notes.push(newNote)
    res.json(200)
});

//locates a note with a specific unique id to remove a note from the array
app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id != req.params.id)
    res.json(notes)
})

app.listen(process.env.port || 3000);


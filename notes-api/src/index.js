// To create object of express class
const express = require('express');


// To create object of fs class
const fs = require('fs');

// Initiating the app once we run the program
const app = express();

require('./db/mongoose') // Initiating mongoose to use it with index.js

const Note = require('./models/note') // Provide Access to our note model

app.use(express.json()); // This step is done to use JSON Format in our app


// WE ARE CREATING A CRUD APP FROM HERE



//CREATE
// IN the most optimized way POST request

app.post('/notes', async (req, res) =>{ 
    const note = new Note(req.body)

    try{
        await note.save()
        res.status(201).send(note)
    }
    catch (err) {
        res.status(400).send(err)
    }


})    


/* // In oder to create a Note we need a POST request

app.post('/notes', (req, res) =>{                 // Through this we need to get information from the frontend
    const note = new Note(req.body)
    note.save() // This is to save note in a database // We can do this because this is a mongoose model

   // This is below save because after the save function is executed then only "then " and catch will execute
    .then(() => {
        res.status(200).send(note)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})
*/
 
//READ
// IN the most optimized way GET request
app.get('/notes', async (req,res) => {
    try {
        const notes = await Note.find({}) // In this we are not providing with anytype of ID or anything
        res.send(notes)
    }
    catch (err) {
        res.status(500).send(err)
    }

})   


/*This is used fetch data from dummy data

// creating a route 
app.get('/notes',(req,res) => {
    fs.readFile(__dirname + '/' + "notes.json", 'utf-8', (err,data) => {
        if (err) {
            return console.log(err) // returnig the error
        }
        res.status(200).send(data) // sending data if no error found
    })
})
*/


// UPDATE

app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)

        // To Check if the note is present
        if (!note){
            return res.status(404).send()
        }       
        
        note.note = req.body.note

        await note.save()

        res.status(200).send(note)
    }
    catch(err){
        res.status(404).send(err)
    }
})


// DELETE

app.delete('/notes/:id', async (req, res) => {
    try{
        const note = await Note.findByIdAndDelete(req.params.id)
        
        // To Check if the note is present
        if (!note){
            return res.status(404).send()
        }

        res.send("The note has been deleted")
    }
    catch(err){
        res.status(500).send(err)
    }


})


// API Listen to a specific port
app.listen(1000,() => {
    console.log("Server is up om port 1000")
})
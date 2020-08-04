const express = require('express');
const utils = require('./utils');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        name: "Julius Caesar",
        number: "45983456",
        id: 1
    },
    {
        name: "Augustus Caesar",
        number: "729464753",
        id: 2
    },
    {
        name: "Tiberius",
        number: "48935792892",
        id: 3
    },
    {
        name: "Caligula",
        number: "84963735378",
        id: 4
    },
]

app.get('/api/persons', (req, res) => {
    return res.json(persons);
})

app.get('/info', (req, res) => {
    const info = `<p>Phonebook has info for ${persons.length} people</P>
                <p>${new Date()}</p>`;
    return res.send(info);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id)
    if (person) {
        return res.json(person);
    } else {
        return res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const toRemove = persons.find(person => person.id === id);
    if (toRemove) {
        persons = persons.filter(person => person.id !== id);
        return res.status(204).end();
    } else {
        return res.status(404).end();
    }
})

app.post('/api/persons', (req, res) => {
    const person = {
        name: req.body.name,
        number: req.body.number,
        id: utils.makeId()
    };
    
    let error = '';
    if (!person.number) error += 'Person must have a number. ';
    if (!person.name) error += 'Person must have a name. ';
    else if (persons.find(p => p.name === person.name)) error += 'Person with this name already exists.';

    if (!error) {
        persons = persons.concat(person);
        return res.status(201).json(person);
    } else {
        return res.status(400).json({ error: error })
    }
});

app.use((req, res) => {
    res.status(404).json({error: 'No such endpoint'})
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
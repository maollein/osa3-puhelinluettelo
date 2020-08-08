require('dotenv').config();
const express = require('express');
const utils = require('./utils');
const morgan = require('morgan');
const Person = require('./models/person');
const errorHandler = require('./middleware/errorhandler');
const hasFields = require('./middleware/has-fields');
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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
})

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        const info = `<p>Phonebook has info for ${count} people</P>
                <p>${new Date()}</p>`;
        return res.send(info);
    });
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id).then(person => {
        if (person) {
            return res.json(person);
        } else {
            return res.status(404).end();
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id).then(() => {
        res.status(204).end();
    })
    .catch(error => {
        next(error);
    });
})

app.post('/api/persons', hasFields(['name', 'number']), (req, res, next) => {
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    });
    person.save().then(savedPerson => {
        return res.status(201).json(savedPerson);
    }).catch(error => next(error));
});

app.put('/api/persons/:id', hasFields(['name', 'number']), (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            return res.json(updatedPerson);
        }).catch(error => next(error));
});

app.use((req, res) => {
    res.status(404).json({error: 'No such endpoint'})
});

app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
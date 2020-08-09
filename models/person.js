const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

// console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8
  }
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

process.on('SIGINT', () => {
  mongoose.connection.close()
    .then(() => {
      console.log('Mongoose connection closed.');
      process.exit();
    }).catch((error) => {
      console.log('Error when closing mongoose connection.');
      process.exit();
    });
});

module.exports = mongoose.model('Person', personSchema);
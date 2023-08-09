// const mongoose = require('mongoose');
// const {Schema} = require('mongoose')
// const questionsSchema = Schema({
//     id: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     text: String,
//     options: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Option',
//         },
//     ],
// });


// const Questions = mongoose.model('Questions',questionsSchema);

// module.exports = Questions;

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Option',
    },
  ],
});

module.exports = mongoose.model('Question', questionSchema);

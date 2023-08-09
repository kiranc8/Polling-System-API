const Questions = require("../models/questionsSchema");
const Option = require('../models/optionsSchema');

module.exports.getQst = async (req, res) => {
    try {
        const question = await Questions.findById(req.params.id).populate('options');
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const populatedOptions = question.options.map(option => {
            return {
                id: option._id,
                text: option.text,
                votes: option.votes,
                link_to_vote: option.link_to_vote,
            };
        });

        const response = {
            id: question._id,
            title: question.title,
            options: populatedOptions,
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch question' });
    }
};

module.exports.createQst = (req, res) => {
    const text = req.body.text;
    Questions.create({ text })
        .then(result => {
            if (result) {
                return res.send('Created Successfully');
            }
            res.send('Could not create question');
        })
        .catch(err => {
            console.log(err);
            res.send('Some error occurred');
        });
};

module.exports.createOpt = async (req, res) => {
    try {
        const questionId = req.params.id; // Get question ID from URL params
        const question = await Questions.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        const { text } = req.body;
        const option = await Option.create({ text, question: question._id });
        option['link_to_vote'] = `http://localhost:8080/options/${option._id}/add_vote`
        await option.save();

        // Push the option to the question's options array
        question.options.push(option._id);
        // Save the updated question
        await question.save();
        res.send('Option Created');
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Could not add option' });
    }
};

module.exports.deleteQst = async (req, res) => {
    const questionId = req.params.id;

    try {
        const questionDeletionResult = await Questions.deleteOne({ _id: questionId });

        if (questionDeletionResult.deletedCount === 0) {
            return res.status(404).send("Question not found");
        }

        await Option.deleteMany({ question: questionId });

        res.send("Deleted Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Some error occurred");
    }
};

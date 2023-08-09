const Questions = require("../models/questionsSchema");
const Options = require("../models/optionsSchema");

module.exports.addVote = async (req, res) => {
  const optionId = req.params.id;
  try {
    const option = await Options.findById(optionId);

    if (!option) {
      return res.status(404).send({ error: "Option not found" });
    }

    // Increment the vote count
    option.votes += 1;

    // Save the updated option
    await option.save();

    res.send({ message: "Vote added successfully", updatedOption: option });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Could not add vote" });
  }
};

module.exports.deleteOpt = async (req, res) => {
  const optionId = req.params.id;
  try {
    let options = await Options.find({ _id: optionId });

    if (options.length === 0) {
      return res.status(404).send("Option not found");
    }

    const questionId = options[0].question;
    let question = await Questions.findOne({ _id: questionId });

    if (!question) {
      return res.status(404).send("Question not found");
    }
    // Remove the option from the options array in the question
    question.options = question.options.filter(opt => opt.toString() !== optionId);

    await Options.deleteOne({ _id: optionId }),
      question.save()

    res.status(200).send("Deleted Option and updated Question");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Could not delete option" });
  }
};

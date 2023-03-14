const Clause = require('../models/Clause');
const bodyParser = require('body-parser');

// Create a Clause
const createClause = async (req, res) => {
  try {
    const { name, content, category, variant } = req.body;
    console.log(req.body);
    const clause = new Clause({ name, content, category, variant });
    const result = await clause.save();
    console.log("Clause Added Seccessfully");
    res.status(201).send({ message: 'Clause Added Successfully', result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
};

//Get all Clause
const getAllClause = async (req, res) => {
  try {
    const result = await Clause.find({});
    console.log('All Clauses retrieved seccessfully');
    res.status(200).send({ message: 'Clause retrieved Successfully', result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Unable to retrieve Clauses' });
  }
}

//Get Clauses of a specific category
const getAllClauseUnderCategory = async (req, res) => {
  try {
    const result = await Clause.find({ category: req.params.category });
    const filteredResult  = {}
    console.log('All Clauses retrieved seccessfully\n',result);

    result.forEach((data)=>{
      console.log(filteredResult);
      if(filteredResult[data.name] && filteredResult[data.name][data.variant]){
        if(data.version > filteredResult[data.name][data.variant].version){
          filteredResult[data.name][data.version] = data
        }     
      }else{
        if(!filteredResult[data.name]){
          filteredResult[data.name] = {}
        }        
        filteredResult[data.name][data.variant] = data
      }
    })

    res.status(200).send({ message: 'Clause retrieved Successfully', filteredResult });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Unable to retrieve Clauses' });
  }
}

module.exports = { createClause, getAllClause, getAllClauseUnderCategory };
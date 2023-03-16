const Clause = require('../models/clause');
const Variant = require('../models/variant')
const bodyParser = require('body-parser');

// API to Create a Clause
const createClause = async (req, res) => {
  try{
    const{ name, content, usedFor } = req.body;
    const clause = new Clause({ name, usedFor });
    const variant = new Variant({
      name: "Default",
      default: true,
      content: content
    });

    // Find all the dynamic parameter present in the content
    const regex = /<<\$\$(.*?)\$\$>>/g;
    const result = content.match(regex);
    parameters =  []
    result.forEach((parameter) =>  {
      parameters.push({
        name: parameter.substring(4,parameter.length-4),
        value: ""
      })
    })


    variant.parameters = parameters
    clause.variant = variant
    const variantResult = await variant.save();
    const clauseResult = await clause.save();
    res.status(201).send({ message: 'Clause Added Successfully', clauseResult })

  }catch(error){
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
};

// Create a version of a variant
const createVersion= async (req,  res) => {
  try{
      return res.json({ msg: "Working" });
  }catch(e){
      return res.json({msg:"dwkrk"})
  }

};

//Get all Clause
const getAllClause = async (req, res) => {
  try {
    // Get id, name, usedFor, status
    const clausesResult = await Clause.find({});
    result = []
    clausesResult.forEach((clauseData) => {
      result.push({
        id: clauseData._id,
        name: clauseData.name,
        usedFor: clauseData.usedFor,
        status: clauseData.status
      })
    })    
    console.log('All Clauses retrieved successfully');
    res.status(200).send({ message: 'Clause retrieved Successfully', result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Unable to retrieve Clauses' });
  }
}

// Get a specific clause and its variants - name, content, default
const getAllVariantsFromAClause = async (req, res) => {
  try{
    console.log(typeof(req.params.id));
    const clauseData = await Clause.findById(req.params.id)
    const variantInfo = clauseData.variant;
    variantResults = []

    await Promise.all(
      variantInfo.map(async (variantId) => {
        const variantData = await Variant.findById(variantId);
        console.log("data ", variantData);
        variantResults.push(variantData)
        console.log(variantResults[0])
      })
    )


    // variantInfo.forEach(async (variantId) => {
    //   console.log(variantId);
    //   const variantData = await Variant.findById(variantId);
    //   console.log("data ", variantData);
    //   variantResults.push(variantData)
    //   console.log(variantResults[0])
    // })
    console.log("outside foreach ",variantResults[0])
    console.log('All Variants retrieved successfully');
    res.status(200).send({ message: 'Clause retrieved Successfully', variantResults });
  }catch(error){
    console.log(error);
    res.status(500).send({ error: 'Unable to retrieve Clauses' });
  }
}

// clause/id/

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

module.exports = { createClause, getAllClause, getAllClauseUnderCategory, getAllVariantsFromAClause, createVersion };
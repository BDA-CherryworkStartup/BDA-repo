const Clause = require('../models/clause');
const Variant = require('../models/variant')
const bodyParser = require('body-parser');
const Version = require('../models/version');

// API to Create a Clause
const createClause = async (req, res) => {
  try{
    const{ name, content, usedFor, description, image, title, signature } = req.body;
    const clause = new Clause({ name, usedFor, description, image, title});
    const variant = new Variant({
      name: "Default",
      default: true,
      content: content,
      title: title,
      description: description,
      signature: signature
    });

    // Find all the dynamic parameter present in the content
    const regex = /\$\$(.*?)\$\$/g;
    const result = content.match(regex);
    parameters =  []
    if(result!=null){
      result.forEach((parameter) =>  {
        parameters.push({
          name: parameter.substring(4,parameter.length-4),
          value: ""
        })
      })
    }   


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
        title: clauseData.title,
        usedFor: clauseData.usedFor,
        description: clauseData.description,
        image: clauseData.image,
        status: clauseData.status,
        variantCount: clauseData.variant.length
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
    const clauseData = await Clause.findById(req.params.id)
    const variantInfo = clauseData.variant;
    variantResults = []

    await Promise.all(
      variantInfo.map(async (variantId) => {
        const variantData = await Variant.findById(variantId);
        // if(variantData.version.length>0){
        //   const versionData = await Version.findById(variantData.version[variantData.version.length-1])
        //   versionData.name = versionData.name + " of " + variantData.name;
        //   variantResults.push(versionData)
        // }else{
        //   variantResults.push(variantData)
        // }

        variantResults.push({
          variantId: variantData._id,
          variantName: variantData.name,
          variantTitle: variantData.title,
          signature: variantData.signature,
          description: variantData.description,
          content: variantData.content,
          parameters: variantData.parameters,
          usedFor: clauseData.usedFor,
          variantDefault: variantData.default,
          versionCount: variantData.version.length
        })
        
      })
    )

    console.log('All Variants retrieved successfully');
    res.status(200).send({ message: 'Variants retrieved Successfully', variantResults });
  }catch(error){
    console.log(error);
    res.status(500).send({ error: 'Unable to retrieve Clauses' });
  }
}

// Get All version From a Variant
const getAllVersionsFromVariant = async(req, res) => {
  try{
    const clauseId = req.params.clause_id;
    const variantId = req.params.variant_id;
    console.log(variantId);
    const variantData = await Variant.findById(variantId);
    console.log(variantData);
    console.log("Variant Name: ", variantData.name);
    versionResult = []
    versionResult.push({
      "_id": variantData._id,
      "name": variantData.name + " Variant",
      "content": variantData.content,
      "parameters": variantData.parameters,
    })
    await Promise.all(
      variantData.version.map(async (versionId) => {
        const versionData = await Version.findById(versionId)
        versionResult.push(versionData)
      })
    )
    
    console.log('All Versions retrieved successfully');
    res.status(200).send({ message: 'Versions retrieved Successfully', versionResult });
  }catch(error){
    console.log(error);
    res.status(500).send({ error: 'Unable to retrieve Clauses' });
  }
}



//Get Clauses of a specific category
const getAllClauseUnderCategory = async (req, res) => {
  try {
    const result = await Clause.find({ category: req.params.category });
    const filteredResult  = {}
    console.log('All Clauses retrieved successfully\n',result);

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

//Create a new variant - get clause id
const createVariant = async(req, res) => {
  try{
    const { clauseId, content, description, name, title, signature } = req.body;
    const clauseData = await Clause.findById(clauseId);
    const versionName = "Variant " + clauseData.variant.length;
    const newVariant = new Variant({
      name: name,
      content: content,
      default: false,
      description: description,
      title: title,
      signature: signature
    })
    const newVariantList = clauseData.variant;
    newVariantList.push(newVariant);
    const clauseToBeUpdated = { _id: clauseId};
    const updatedClause = { $set: {variant: newVariantList}};

    // Find all the dynamic parameter present in the content
    const regex = /\$\$(.*?)\$\$/g;
    const result = content.match(regex);
    parameters =  []
    if(result!=null){
      result.forEach((parameter) =>  {
        parameters.push({
          name: parameter.substring(4,parameter.length-4),
          value: ""
        })
      })
    }
    
    newVariant.parameters = parameters;

    const resultClause = await Clause.updateOne(clauseToBeUpdated, updatedClause);
    const resultVariant = newVariant.save();
    res.status(200).send({ message: 'Variant Added Successfully', resultClause });

  }catch(error){
    console.log(error);
    res.status(500).send({ error: 'Unable to retrieve Clauses' });
  }
} 

// Update A variant i.e create a version 
const createVersion = async (req, res) => {
  try{
    const {clauseId, variantId, content, name, signature, usedFor} = req.body;
    const clauseData = await Clause.findById(clauseId);
    const variantData = await Variant.findById(variantId);
    const versionName = variantData.version.length + 1
    const newVersion = new Version({
      name: name,
      versionNumber: versionName,
      content: content,
      usedFor: usedFor,
      signature: signature
    })

    // Find all the dynamic parameter present in the content
    const regex = /\$\$(.*?)\$\$/g;
    const result = content.match(regex);
    parameters =  []
    if(result!=null){
      result.forEach((parameter) =>  {
        parameters.push({
          name: parameter.substring(4,parameter.length-4),
          value: ""
        })
      })
    }

    newVersion.parameters = parameters

    const newVersionList = variantData.version;
    newVersionList.push(newVersion);
    const variantToBeUpdated = { _id: variantId};
    const updatedVariant = { $set: {version: newVersionList}};

    const resultVariant = await Variant.updateOne(variantToBeUpdated, updatedVariant);
    const resultVersion = newVersion.save();
    res.status(200).send({ message: 'Variant Updated Successfully', resultVersion });

  }catch(error){
    console.log(error);
    res.status(500).send({ error: 'Unable to update variant' });
  }
}

module.exports = { createVersion, createClause, getAllClause, getAllClauseUnderCategory, getAllVariantsFromAClause, getAllVersionsFromVariant, createVariant };
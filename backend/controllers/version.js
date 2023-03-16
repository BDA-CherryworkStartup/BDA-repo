const Clause = require('../models/clause');
const Variant = require('../models/variant')
const Version = require('../models/version')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createVersion= async (req,  res) => {
    try{
        const {clauseId, variantId, content, name} = req.body 
        const clauseData = await Clause.findById(clauseId)
        for(let i=0 ; i<clauseData.variant.length; i++){
            if(clauseData.variant[i].toString() === variantId ){
                const variantss = await Variant.findById(variantId)
                let a = variantss.version.length
                const regex = /<<\$\$(.*?)\$\$>>/g;
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
                
                const newVersion = new Version({
                    name: "Version "+ (a+1),
                    content: content,
                    parameters: parameters
                  })     
                  const newVersionList = variantss.version;
                  newVersionList.push(newVersion); 

                  console.log(newVersionList)

                  const variantToBeUpdated = { _id: variantId};
                  const updatedVariant = { $set: {version: newVersionList}};
                  
                  const resultVariant = await Variant.updateOne(variantToBeUpdated, updatedVariant);
                  const resultVersion = newVersion.save();

                 

            }
            return res.status(200).send({message:"Version Added Successfully"}, resultVariant);
            
        }

        return res.json({ msg: "Variant not available in clause" });
    }catch(e){
        return res.json({msg:e.message})
    }
  
};

module.exports = {createVersion}
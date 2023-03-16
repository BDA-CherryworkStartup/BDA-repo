const Clause = require('../models/clause');
const Variant = require('../models/variant')
const bodyParser = require('body-parser');

const createVersion= async (req,  res) => {
    try{
        const {clauseid, variantid, content, name, parameters, timestamp} = req.body || {}
        const clauseData = await Clause.findById(clauseid);
        console.log(clauseData);

        return res.json({ msg: "Working" });
    }catch(e){
        return res.json({msg:"dwkrk"})
    }
  
};

module.exports = {createVersion}
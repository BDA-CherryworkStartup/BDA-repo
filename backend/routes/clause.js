const express = require('express');
const router = express.Router();

const { createClause, createVersion, getAllClause, getAllClauseUnderCategory, getAllVariantsFromAClause, getAllVersionsFromVariant, createVariant } = require('../controllers/clause')
// const {createVersion} = require('../controllers/version')
// Create a Clause
router.post('/', createClause);

//Create a Version
// router.post('/:clause_id/:variant_id', createVersion);


// Get All Clause
router.get('/', getAllClause);

// Add A version
router.post("/updateVersion", createVersion)

// Create New Variant
router.post('/createVariant', createVariant)

// Get All Variants under a Clause
router.get('/:id', getAllVariantsFromAClause); 

//Get All version of a variant
router.get('/:clause_id/variant/:variant_id', getAllVersionsFromVariant)

// Get Clauses under specific category
router.get('/:category', getAllClauseUnderCategory); 




module.exports = router;
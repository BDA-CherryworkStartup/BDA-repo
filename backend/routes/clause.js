const express = require('express');
const router = express.Router();

const { createClause, getAllClause, getAllClauseUnderCategory, getAllVariantsFromAClause } = require('../controllers/clause')
const {createVersion} = require('../controllers/version')
// Create a Clause
router.post('/', createClause);

//Create a Version
// router.post('/:clause_id/:variant_id', createVersion);
// Get All Clause
router.get('/', getAllClause);
router.get("/ghdf", createVersion)

// Get All Variants under a Clause
router.get('/:id', getAllVariantsFromAClause); 

// Get Clauses under specific category
router.get('/:category', getAllClauseUnderCategory); 




module.exports = router;
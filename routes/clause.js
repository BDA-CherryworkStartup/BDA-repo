const express = require('express');
const router = express.Router();

const { createClause, getAllClause, getAllClauseUnderCategory } = require('../controllers/clause')

// Create a user
router.post('/', createClause);

// Get All Clause
router.get('/', getAllClause);

// Get Clauses under specific category
router.get('/:category', getAllClauseUnderCategory); 

module.exports = router;
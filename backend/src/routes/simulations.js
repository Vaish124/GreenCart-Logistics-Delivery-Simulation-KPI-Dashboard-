const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const r = await db.query('SELECT id, created_at, input_json, result_json FROM simulations ORDER BY created_at DESC LIMIT 20');
  res.json(r.rows);
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const r = await db.query('SELECT id, created_at, input_json, result_json FROM simulations WHERE id=$1', [id]);
  if (r.rowCount===0) return res.status(404).json({error:'not_found'});
  res.json(r.rows[0]);
});

module.exports = router;

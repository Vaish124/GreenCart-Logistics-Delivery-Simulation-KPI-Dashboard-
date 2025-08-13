const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

// list drivers
router.get('/', auth, async (req, res) => {
  const r = await db.query('SELECT id, name, current_shift_hours, past_7_day_hours FROM drivers');
  res.json(r.rows);
});

// create driver
router.post('/', auth, async (req, res) => {
  const { name, current_shift_hours=0, past_7_day_hours=0 } = req.body;
  if (!name) return res.status(400).json({error:'name_required'});
  const id = uuidv4();
  await db.query('INSERT INTO drivers(id, name, current_shift_hours, past_7_day_hours) VALUES($1,$2,$3,$4)', [id,name,current_shift_hours,past_7_day_hours]);
  res.status(201).json({id,name,current_shift_hours,past_7_day_hours});
});

// update
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, current_shift_hours, past_7_day_hours } = req.body;
  await db.query('UPDATE drivers SET name=$1, current_shift_hours=$2, past_7_day_hours=$3 WHERE id=$4', [name, current_shift_hours, past_7_day_hours, id]);
  res.json({ok:true});
});

// delete
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM drivers WHERE id=$1', [id]);
  res.json({ok:true});
});

module.exports = router;

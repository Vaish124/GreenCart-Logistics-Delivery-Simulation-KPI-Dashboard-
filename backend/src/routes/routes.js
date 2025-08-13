const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const r = await db.query('SELECT id, route_id, distance_km, traffic_level, base_time_minutes FROM routes');
  res.json(r.rows);
});

router.post('/', auth, async (req, res) => {
  const { route_id, distance_km, traffic_level, base_time_minutes } = req.body;
  if (!route_id) return res.status(400).json({error:'route_id_required'});
  const id = uuidv4();
  await db.query('INSERT INTO routes(id, route_id, distance_km, traffic_level, base_time_minutes) VALUES($1,$2,$3,$4,$5)',
    [id, route_id, distance_km, traffic_level, base_time_minutes]);
  res.status(201).json({id,route_id,distance_km,traffic_level,base_time_minutes});
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { route_id, distance_km, traffic_level, base_time_minutes } = req.body;
  await db.query('UPDATE routes SET route_id=$1, distance_km=$2, traffic_level=$3, base_time_minutes=$4 WHERE id=$5',
    [route_id, distance_km, traffic_level, base_time_minutes, id]);
  res.json({ok:true});
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM routes WHERE id=$1', [id]);
  res.json({ok:true});
});

module.exports = router;

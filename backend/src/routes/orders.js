const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const r = await db.query('SELECT id, order_id, value_rs, assigned_route, delivery_timestamp FROM orders');
  res.json(r.rows);
});

router.post('/', auth, async (req, res) => {
  const { order_id, value_rs, assigned_route, delivery_timestamp=null } = req.body;
  if (!order_id) return res.status(400).json({error:'order_id_required'});
  const id = uuidv4();
  await db.query('INSERT INTO orders(id, order_id, value_rs, assigned_route, delivery_timestamp) VALUES($1,$2,$3,$4,$5)',
    [id, order_id, value_rs, assigned_route, delivery_timestamp]);
  res.status(201).json({id,order_id,value_rs,assigned_route,delivery_timestamp});
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { order_id, value_rs, assigned_route, delivery_timestamp } = req.body;
  await db.query('UPDATE orders SET order_id=$1, value_rs=$2, assigned_route=$3, delivery_timestamp=$4 WHERE id=$5',
    [order_id, value_rs, assigned_route, delivery_timestamp, id]);
  res.json({ok:true});
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM orders WHERE id=$1', [id]);
  res.json({ok:true});
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET || 'replace_me';

// login — expects { email, password }
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({error:'email_and_password_required'});
  try {
    const r = await db.query('SELECT id, email, password_hash, name FROM managers WHERE email=$1', [email]);
    if (r.rowCount === 0) return res.status(401).json({error:'invalid_credentials'});
    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({error:'invalid_credentials'});
    const token = jwt.sign({id:user.id, email:user.email, name:user.name}, SECRET, {expiresIn:'8h'});
    res.json({token, user: {id:user.id, email:user.email, name:user.name}});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:'server_error'});
  }
});

module.exports = router;

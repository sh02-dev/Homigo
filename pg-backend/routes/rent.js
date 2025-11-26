// routes/rent.js
const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/create', requireAuth('admin'), async (req, res, next) => {
  try {
    const { tenant_id, month, year, amount } = req.body;
    const [r] = await pool.query('INSERT INTO rents (tenant_id, month, year, amount) VALUES (?, ?, ?, ?)', [tenant_id, month, year, amount]);
    res.json({ id: r.insertId });
  } catch (err) { next(err) }
});

router.put('/pay/:id', requireAuth('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    await pool.query('UPDATE rents SET status = "Paid", date_paid = NOW() WHERE id = ?', [id]);
    res.json({ ok: true });
  } catch (err) { next(err) }
});

router.get('/pending', requireAuth('admin'), async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM rents WHERE status != "Paid" ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { next(err) }
});

router.get('/history/:tenantId', requireAuth(), async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const [rows] = await pool.query('SELECT * FROM rents WHERE tenant_id = ? ORDER BY year DESC, month DESC', [tenantId]);
    res.json(rows);
  } catch (err) { next(err) }
});

module.exports = router;

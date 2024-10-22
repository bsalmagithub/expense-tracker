// routes/transactions.js

const express = require('express');
const router = express.Router();
const db = require('../db/database');

/**
 * @route   POST /transactions
 * @desc    Add a new transaction
 * @access  Public
 */
router.post('/', (req, res) => {
    const { type, category, amount, date, description } = req.body;

    // Validate required fields
    if (!type || !category || !amount || !date) {
        return res.status(400).json({ error: 'Type, category, amount, and date are required.' });
    }

    // Validate type
    if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ error: "Type must be either 'income' or 'expense'." });
    }

    const query = `
        INSERT INTO transactions (type, category, amount, date, description)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [type, category, amount, date, description || null], function(err) {
        if (err) {
            console.error('Error inserting transaction:', err.message);
            return res.status(500).json({ error: 'Failed to add transaction.' });
        }
        res.status(201).json({ id: this.lastID });
    });
});

/**
 * @route   GET /transactions
 * @desc    Retrieve all transactions
 * @access  Public
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM transactions ORDER BY date DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching transactions:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve transactions.' });
        }
        res.status(200).json(rows);
    });
});

/**
 * @route   GET /transactions/:id
 * @desc    Retrieve a transaction by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM transactions WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error fetching transaction:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve transaction.' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Transaction not found.' });
        }
        res.status(200).json(row);
    });
});

/**
 * @route   PUT /transactions/:id
 * @desc    Update a transaction by ID
 * @access  Public
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;

    // Validate required fields
    if (!type || !category || !amount || !date) {
        return res.status(400).json({ error: 'Type, category, amount, and date are required.' });
    }

    // Validate type
    if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ error: "Type must be either 'income' or 'expense'." });
    }

    const query = `
        UPDATE transactions
        SET type = ?, category = ?, amount = ?, date = ?, description = ?
        WHERE id = ?
    `;

    db.run(query, [type, category, amount, date, description || null, id], function(err) {
        if (err) {
            console.error('Error updating transaction:', err.message);
            return res.status(500).json({ error: 'Failed to update transaction.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Transaction not found.' });
        }
        res.status(200).json({ message: 'Transaction updated successfully.' });
    });
});

/**
 * @route   DELETE /transactions/:id
 * @desc    Delete a transaction by ID
 * @access  Public
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM transactions WHERE id = ?`;

    db.run(query, [id], function(err) {
        if (err) {
            console.error('Error deleting transaction:', err.message);
            return res.status(500).json({ error: 'Failed to delete transaction.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Transaction not found.' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully.' });
    });
});

/**
 * @route   GET /transactions/summary
 * @desc    Get summary of transactions (total income, total expenses, balance)
 * @access  Public
 */
router.get('/summary', (req, res) => {
    const incomeQuery = `SELECT SUM(amount) AS totalIncome FROM transactions WHERE type = 'income'`;
    const expenseQuery = `SELECT SUM(amount) AS totalExpense FROM transactions WHERE type = 'expense'`;

    db.get(incomeQuery, [], (err, incomeRow) => {
        if (err) {
            console.error('Error fetching income summary:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve income summary.' });
        }

        db.get(expenseQuery, [], (err, expenseRow) => {
            if (err) {
                console.error('Error fetching expense summary:', err.message);
                return res.status(500).json({ error: 'Failed to retrieve expense summary.' });
            }

            const totalIncome = incomeRow.totalIncome || 0;
            const totalExpense = expenseRow.totalExpense || 0;
            const balance = totalIncome - totalExpense;

            res.status(200).json({ totalIncome, totalExpense, balance });
        });
    });
});

module.exports = router;

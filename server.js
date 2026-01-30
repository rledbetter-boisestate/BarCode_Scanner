const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// 1. Scan Book Endpoint
app.post('/api/scan', async (req, res) => {
    const { barcode, call_number, bookshelf_number } = req.body;

    try {
        // Step A: Check Weeding List
        const weedCheck = await pool.query('SELECT * FROM weeding_list WHERE barcode = $1', [barcode]);
        if (weedCheck.rows.length > 0) {
            return res.json({ 
                status: 'alert', 
                message: `ALERT: Book ${barcode} is on the WEEDING LIST!` 
            });
        }

        // Step B: Upsert Book (Insert or Update location)
        await pool.query(
            `INSERT INTO books (barcode, call_number, bookshelf_number, last_scanned)
             VALUES ($1, $2, $3, NOW())
             ON CONFLICT (barcode) 
             DO UPDATE SET bookshelf_number = $3, last_scanned = NOW()`,
            [barcode, call_number, bookshelf_number]
        );

        res.json({ status: 'success', message: 'Book saved successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// 2. Get Shelf Contents Endpoint
app.get('/api/shelf/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books WHERE bookshelf_number = $1', [req.params.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
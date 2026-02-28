const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();            // leer .env

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());                                  // allow cross-origin requests
// serve the entire project directory so the browser can request HTML/CSS/JS
app.use(express.static(path.join(__dirname, '..')));

// el cliente se crea una sola vez con las variables de entorno
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// endpoint público que el front llama
app.get('/api/events', async (req, res) => {
    try {
        const { from = '2026-01-01', to = '2026-12-31' } = req.query;

        const { data, error } = await supabase
            .from('eventos')
            .select('*')
            .gte('fecha', from)
            .lte('fecha', to)
            .order('fecha', { ascending: true });

        if (error) return res.status(500).json({ error });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'unexpected' });
    }
});

app.listen(port, () => console.log(`API listening on ${port}`));
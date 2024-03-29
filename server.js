const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servi i file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

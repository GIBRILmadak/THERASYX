// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Remplacez ces identifiants par les vôtres (utilisez un mot de passe d'application Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gibril.therasyx@gmail.com',
        pass: 'ncrd ffxj tbek pcpc' // à remplacer par un mot de passe d'application Gmail
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }
    try {
        await transporter.sendMail({
            from: email,
            to: 'gibril.therasyx@gmail.com',
            subject: `Nouveau message de ${name}`,
            text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

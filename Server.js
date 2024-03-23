const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/Apirest", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
});

app.use(express.json());

//Route pour RETOURNER TOUS LES UTILISATEURS
app.get('/users',(req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: error.message }))})
    ;
// Route pour AJOUTER UN NOUVEL UTILISATEUR À LA BASE DE DONNÉES
app.post('/users', (req, res) => {
    // Créer une nouvelle instance d'utilisateur basée sur le corps de la requête
    const newUser = new User(req.body);
    
    // Enregistrer le nouvel utilisateur dans la base de données
    newUser.save()
        .then(savedUser => res.json(savedUser))
        .catch(error => res.status(500).json({ error: error.message }));
});

// Route pour MODIFIER UN UTILISATEUR PAR ID
app.put('/users/:id', (req, res) => {
    // Extrait l'ID de l'utilisateur des paramètres de la requête
    const { id } = req.params;
    
    // Trouve et met à jour l'utilisateur dans la base de données par ID
    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(error => res.status(500).json({ error: error.message }));
});

// Route pour SUPPRIMER UN UTILISATEUR PAR ID
app.delete('/users/:id', (req, res) => {
    // Extrait l'ID de l'utilisateur des paramètres de la requête
    const { id } = req.params;
    
    // Trouve et supprime l'utilisateur dans la base de données par ID
    User.findByIdAndDelete(id)
        .then(deletedUser => res.json(deletedUser))
        .catch(error => res.status(500).json({ error: error.message }));
});

//  Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});


/* Route pour AJOUTER UN NOUVEL UTILISATEUR À LA BASE DE DONNÉES
app.post('/users', (req, res) => {
    // Crée une nouvelle instance d'utilisateur basée sur le corps de la requête
    const newUser = new User(req.body);
    newUser.save()
    .then(savedUser => res.json(savedUser))
    .catch(error => res.status(500).json({ error: error.message }));
}); 


/Route pour MODIFIER UN UTILISATEUR PAR ID
app.put('/users/:id', (req, res) => {
    // Extrait l'ID de l'utilisateur des paramètres de la requête
    const { id } = req.params;
    
    // Trouve et met à jour l'utilisateur dans la base de données par ID
    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(error => res.status(500).json({ error: error.message }));
}); 

/*Route pour SUPPRIMER UN UTILISATEUR PAR ID
app.delete('/users/:id', (req, res) => {
    // Extrait l'ID de l'utilisateur des paramètres de la requête
    const { id } = req.params;
    
    // Trouve et supprime l'utilisateur dans la base de données par ID
    User.findByIdAndDelete(id)
        .then(deletedUser => res.json(deletedUser))
        .catch(error => res.status(500).json({ error: error.message }));
});
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); */

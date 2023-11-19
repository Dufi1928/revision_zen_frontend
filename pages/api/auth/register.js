import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, pseudo, password, firstName, lastName } = req.body;

            const response = await axios.post('https://revisionzen.com:8000/api/auth/register', {
                email, pseudo, password, firstName, lastName
            });

            res.status(200).json({ jwtToken: response.data.jwt });
        } catch (error) {
            if (error.response) {
                // Envoyer le message d'erreur personnalisé du backend
                res.status(error.response.status).json({ message: error.response.data.error });
            } else {
                // Pour les erreurs qui ne sont pas des réponses HTTP (par exemple, problèmes de réseau)
                res.status(500).json({ message: error.message });
            }
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Méthode non autorisée');
    }
}
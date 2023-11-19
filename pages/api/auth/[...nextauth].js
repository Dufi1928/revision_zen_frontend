import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const passkey = process.env.DJANGO_SECRET_KEY;
                const response = await axios.post('https://revisionzen.com:8000/api/auth/checkIfUserExist', {
                    email: email || user.email,
                    passkey
                });

                if (response.status === 200 && response.data.jwt) {
                    user.jwt = response.data.jwt; // Stocker le JWT dans l'objet user
                    account.jwt = response.data.jwt; // Stocker le JWT dans l'objet account
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'utilisateur : ", error);
                return false;
            }
        },

        async session({ session, token }) {
            session.jwt = token.jwt; // Ajouter le JWT à la session
            return session;
        },

        async jwt({ token, user, account }) {
            if (account?.jwt) {
                token.jwt = account.jwt; // Passer le JWT au token
            }
            return token;
        },
    },
});
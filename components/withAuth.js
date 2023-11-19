import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider'; // Import useAuth for accessing AuthContext
import axios from 'axios';
import { signIn, signOut, useSession } from "next-auth/react";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { isLoggedIn, logIn } = useAuth();
        const { data, status } = useSession();
        const router = useRouter();
        const { data: session } = useSession();

        if (status === 'loading') return <h1> loading... please wait</h1>;
        if (status === 'authenticated'){
            logIn(session.jwt);
        }else{
            if (localStorage.getItem('jwt')) {
                    let token = localStorage.getItem('jwt');
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: 'https://revisionzen.com:8000/api/auth/checkjwt',
                        headers: {
                            'Content-Type': 'text/plain',
                            'Authorization': `Bearer ${token}`
                        }
                    };
                    axios.request(config)
                        .then((response) => {
                            if (response.data.id) {
                                logIn(token); // Update the state to reflect the user is logged in
                            } else {
                                router.push('/auth/login');
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            router.push('/auth/login');
                        });
                } else {
                    // Redirect to login if no token is found
                    router.push('/auth/login');
                }
        }

        return isLoggedIn ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;

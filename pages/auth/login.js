import React, {useState} from 'react';

import { useAuth } from '../../contexts/AuthProvider';
import styles from '../../styles/Signup.module.css'
import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";


function LogIn() {
    const { data, status } = useSession();

    if (status === 'loading') return <h1> loading... please wait</h1>;
    if (status === 'authenticated') {
        return (
            <div>
                <h1> hi {data.user.name}</h1>
                <img src={data.user.image} alt={data.user.name + ' photo'} />
                <button onClick={signOut}>sign out</button>
            </div>
        );
    }
    // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return (
        <button onClick={() => signIn('google', { callbackUrl: `${currentUrl}/` })}>
            sign in with google
        </button>
    );
}

export default LogIn;

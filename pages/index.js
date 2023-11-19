// pages/index.js
import React, { useState} from 'react';
// import styles from '../styles/Home.module.css';
// import { useRouter } from 'next/router';
// import SidebarNavigation from "@/components/SidebarNavigation";
import withAuth from "../components/withAuth"
import { signIn, signOut, useSession } from "next-auth/react";


const Home = () => {
    // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return (
        <>
        <p>hello world</p>
        </>
    );
}
export default withAuth(Home);

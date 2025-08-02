'use client';

import dynamic from "next/dynamic";

const ClientNavbar = dynamic(
    () => import('./Navbar'),
    { ssr:false }
);

export default ClientNavbar;
"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  //this is a high order component
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

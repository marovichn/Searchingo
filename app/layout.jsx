import "@styles/globals.css";

import Nav from "@components/Nav";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Searchingo",
  description: "Discover & Share AI Prompts",
  icons:{
    icon:"/icon.ico"
  }
};

const RootLayout = ({ children, session }) => (
  <html lang='en'>
    <body>
      <SessionProvider session={session}>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;

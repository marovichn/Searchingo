import "@styles/globals.css";
import React from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Searchtopia",
  description: "Discover & Share amazing prompts",
};

const RootLayout = (props) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav />
            {props.children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

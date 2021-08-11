import Login from "./Components/LoginPage";
import Main from "./Components/Main";
import React, { useState } from "react";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import SocketProvider from "./contexts/SocketProvider";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider id={id}>
        <ConversationsProvider id={id}>
          <Main id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;

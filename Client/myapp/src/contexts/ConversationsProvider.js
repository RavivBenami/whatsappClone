import React, { useCallback, useContext, useEffect, useState } from "react";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import axios from "axios";

const ConversationsContexts = React.createContext();

export function useConversations() {
  return useContext(ConversationsContexts);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useState([]);
  const { contacts } = useContacts();
  const [selectConversationsIndex, setSelectConversationsIndex] = useState(0);
  const socket = useSocket();

  const changed = async () => {
    let data = await axios.get("http://localhost:5000/conversation");
    let counter = 0;
    console.log(data.data);
    let filteredConversations = data.data.filter((conversation) => {
      if (conversation.login == id) {
        counter++;
        return conversation;
      }
    });
    setConversations(filteredConversations);
    if (counter == 0) {
      let index = 0;
      let conversationIndex = data.data.filter((item) => {
        index = item.recipients.findIndex((item2) => item2 == id);
        if (index !== -1) {
          return item;
        }
      });
      console.log(conversationIndex);
      if (typeof conversationIndex[0] !== "undefined" && conversationIndex.length !== 0) {
        setConversations(conversationIndex)
      }
    }
    console.log(conversations);
  };

  const createConversation = async (recipients) => {
    let obj = { recipients, messages: [], login: id };
    await axios.post(`http://localhost:5000/conversation`, obj);
    changed();
  };

  const addMessageToConversation = useCallback(
    async ({ recipients, text, sender }) => {
      console.log(socket);
      const newMessage = { sender, text };
      let counter = 0;
      for (let i = 0; i < conversations.length; i++) {
        let conversationsRecipients = conversations[i].recipients.map((item) => {
          console.log(item.charAt(0));
          if (item.charAt(0) == " ") {
            changed();
            return item.substring(1);
          } else {
            return item;
          }
        });
        recipients = recipients.map((item) => {
          if (item.charAt(0) == " ") {
            changed();
            return item.substring(1);
          } else {
            return item;
          }
        });
        if (arrayEquality(conversations[i].recipients, recipients)) {
          await axios.put(`http://localhost:5000/conversation/${conversations[i]._id}`, { recipients, messages: [...conversations[i].messages, newMessage], login: id });
          changed();
          break;
        } else {
          counter++;
        }

        if (counter == conversations.length) {
          await axios.post(`http://localhost:5000/conversation`, { recipients, messages: [newMessage], login: id });
          changed();
          break;
        }
      }
    },
    [changed]
  );

  useEffect(async () => {
    changed();
  }, []);
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectConversationsIndex;
    return { ...conversation, messages, recipients, selected };
  });

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({ recipients, text, sender: id });
  }

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectConversationsIndex],
    sendMessage,
    selectConversationIndex: setSelectConversationsIndex,
    createConversation,
  };

  return <ConversationsContexts.Provider value={value}>{children}</ConversationsContexts.Provider>;
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}

import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import SideBar from "./SideBar";
import OpenConversation from "./OpenConversation";

function Main({ id }) {
  const {selectedConversation} = useConversations()

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <SideBar id={id} />
      {selectedConversation && <OpenConversation/>}
    </div>
  );
}
export default Main;

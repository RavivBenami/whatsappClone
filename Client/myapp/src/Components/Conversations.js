import React from "react";
import {ListGroup} from 'react-bootstrap'
import { useConversations } from "../contexts/ConversationsProvider";

function Conversations({id}) {

  const {conversations,selectConversationIndex} = useConversations()

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation,index) => (
        <ListGroup.Item key={index} action onClick={()=>selectConversationIndex(index)} active={conversation.selected}>
            {conversation.recipients.map(r=>{
              // if(r.id == id){
              //   console.log(conversation.login);
              // }
            console.log(r);
             return r.name
              }).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversations;

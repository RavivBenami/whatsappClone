import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactsId] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleCheckboxChange = (id) => {
    setSelectedContactsId((prevSelectedContactId) => {
      if (prevSelectedContactId.includes(id)) {
        return prevSelectedContactId.filter((prevId) => {
          return id !== prevId;
        });
      } else {
        return [...prevSelectedContactId, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedContactIds);
    createConversation(selectedContactIds);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversations</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check type="checkbox" value={selectedContactIds.includes(contact.id)} label={contact.name} onChange={() => handleCheckboxChange(contact.id)}></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;

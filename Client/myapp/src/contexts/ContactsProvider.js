import React, { useContext, useState,useEffect } from "react";
import axios from 'axios'

const ContactsContexts = React.createContext();

export function useContacts() {
  return useContext(ContactsContexts);
}

export  function ContactsProvider({ id,children }) {
  const [contacts, setContacts] = useState([])
  const [sender_Id,setSender_Id] = useState("")

  const changed = async()=>{
    let data = await axios.get(`http://localhost:5000/contact/${sender_Id}`)
    setContacts(data.data.contacts)
  }

  useEffect(async()=>{
    let data = await axios.get("http://localhost:5000/contact")
    let counter=0;
    if(data.data.length != 0){
    data.data.forEach(item=>{
      if(item.senderId == id){
        counter++
        setSender_Id(item._id)
        setContacts(item.contacts)
      }
    })
    if(counter==0){
      let obj = await axios.post(`http://localhost:5000/contact`,{senderId:id , contacts:[]})
      setSender_Id(obj.data._id)
    }
  }
  else {
   let obj = await axios.post(`http://localhost:5000/contact`,{senderId:id , contacts:[]})
   setSender_Id(obj.data._id)
  }
  },[])

  const createContact = async(contactId, name) => {
    let obj = {senderId:id,contacts:[...contacts,{id:contactId,name}]}
    console.log(obj);
    await axios.put(`http://localhost:5000/contact/${sender_Id}`,obj)
    changed()
  };

  return <ContactsContexts.Provider value={{ contacts, createContact }}>
      {children}
      </ContactsContexts.Provider>;
}

import React from "react";

import contacts from "../../_mockData/contacts.json";
import ContactCard from "./ContactCard";

const Contacts = () => {
  return (
    <div>
      {contacts.map((contact) => {
        return <ContactCard key={contact._id} contact={contact} />;
      })}
    </div>
  );
};

export default Contacts;

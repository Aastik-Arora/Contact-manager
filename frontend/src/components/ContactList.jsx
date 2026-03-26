import ContactItem from "./ContactItem.jsx";

export default function ContactList({ contacts, onEdit, onDelete }) {
  if (!contacts.length) {
    return <div className="emptyState">No contacts yet. Add one!</div>;
  }

  return (
    <div className="contactList">
      {contacts.map((c) => (
        <ContactItem
          key={c._id}
          contact={c}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}


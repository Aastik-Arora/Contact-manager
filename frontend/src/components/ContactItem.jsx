export default function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <div className="contactItem">
      <div className="contactMain">
        <div className="contactName">{contact.name}</div>
        {contact.email ? (
          <div className="contactMeta">Email: {contact.email}</div>
        ) : null}
        {contact.phone ? (
          <div className="contactMeta">Phone: {contact.phone}</div>
        ) : null}
      </div>
      <div className="contactActions">
        <button type="button" className="btn" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button
          type="button"
          className="btn danger"
          onClick={() => onDelete(contact._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}


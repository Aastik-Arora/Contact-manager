import { useEffect, useMemo, useState } from "react";
import { createContact, deleteContact, getContacts, updateContact } from "./api";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const emptyForm = useMemo(
    () => ({ name: "", email: "", phone: "" }),
    []
  );

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setLoadingList(true);
    setError("");
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit() {
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name,
        email: form.email || undefined,
        phone: form.phone || undefined,
      };

      if (editingId) {
        await updateContact(editingId, payload);
      } else {
        await createContact(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  function onEdit(contact) {
    setError("");
    setEditingId(contact._id);
    setForm({
      name: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
    });
  }

  function onCancelEdit() {
    setError("");
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onDelete(id) {
    setError("");
    const ok = window.confirm("Delete this contact?");
    if (!ok) return;

    try {
      await deleteContact(id);
      await refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="page">
      <div className="shell">
        <header className="header">
          <h1>Contact Manager</h1>
          <div className="sub">MERN mini demo (React + Express + MongoDB)</div>
        </header>

        <div className="grid">
          <ContactForm
            value={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            onCancel={onCancelEdit}
            isEditing={Boolean(editingId)}
            loading={saving}
            error={error}
          />

          <div className="listPanel">
            <div className="listHeader">
              <h2>Contacts</h2>
              <button
                type="button"
                className="btn secondary"
                onClick={refresh}
                disabled={loadingList}
              >
                {loadingList ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {contacts.length ? null : loadingList ? (
              <div className="loading">Loading...</div>
            ) : null}

            <ContactList contacts={contacts} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}


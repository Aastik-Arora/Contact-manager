export default function ContactForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  loading,
  error,
}) {
  return (
    <form
      className="contactForm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h2>{isEditing ? "Edit Contact" : "Add Contact"}</h2>

      {error ? <div className="formError">{error}</div> : null}

      <label className="field">
        <span>Name *</span>
        <input
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          required
          placeholder="e.g., John Doe"
        />
      </label>

      <label className="field">
        <span>Email</span>
        <input
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          placeholder="e.g., john@example.com"
        />
      </label>

      <label className="field">
        <span>Phone</span>
        <input
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          placeholder="e.g., +91 98765 43210"
        />
      </label>

      <div className="formButtons">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update" : "Create"}
        </button>
        {isEditing ? (
          <button
            type="button"
            className="btn secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}


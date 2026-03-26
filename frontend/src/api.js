async function handleResponse(res) {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const message =
      data?.message ||
      (typeof data === "string" ? data : "Request failed");
    throw new Error(message);
  }
  return data;
}

export async function getContacts() {
  const res = await fetch("/api/contacts");
  return handleResponse(res);
}

export async function createContact(payload) {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateContact(id, payload) {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteContact(id) {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}


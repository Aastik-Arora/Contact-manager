const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// GET all contacts (newest first)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// POST create a contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body ?? {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "Field `name` is required" });
    }

    const created = await Contact.create({
      name: String(name).trim(),
      email: email ? String(email).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Failed to create contact" });
  }
});

// PUT update a contact by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body ?? {};

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "Field `name` is required" });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      {
        name: String(name).trim(),
        email: email ? String(email).trim() : undefined,
        phone: phone ? String(phone).trim() : undefined,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update contact" });
  }
});

// DELETE a contact by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

module.exports = router;


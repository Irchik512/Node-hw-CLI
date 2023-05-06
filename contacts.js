const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const list = await listContacts();
    const result = list.find((item) => item.id === contactId);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(data) {
  try {
    const list = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(contactId, data) {
  try {
    const list = await listContacts();
    const index = list.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    list[index] = { id: contactId, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return list[index];
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const list = await listContacts();
    const index = list.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
};

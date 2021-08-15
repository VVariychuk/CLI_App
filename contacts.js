const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        console.table(contacts);
    } catch (error) {
        console.log(error.message);
     }
};

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = contacts.find(el => el.id === contactId);
        console.table(contact);
    } catch (error) {
        console.log(error.message);
     }
};

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data).filter(el => el.id !== contactId);
        console.table(contacts);
        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.log(error.message);
    }
};

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const newContact = { id: shortid.generate(), name, email, phone };
        const updatedContacts = [...contacts, newContact];
        contacts.push(newContact);
        console.table(updatedContacts);
        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.log(error.message);
    }
};

modules.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);        
        return contacts;
    } catch (error) {
        console.log(error.message);
     }
};

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = contacts.find(el => el.id === +contactId); 
        if (!contact)  {
            return 'Sorry, we have no this contact'
        };
        return contact;
    } catch (error) {
        console.log(error.message);
     }
};

async function removeContact(contactId) {
    try {
        const contactsList = await listContacts();
        const contactIndex = await contactsList.findIndex((el) => el.id === +contactId);
        
    if (!~contactIndex) {
      throw new Error(`Contact with id=${contactId} not found`);
    };

    const removedContact = await contactsList.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    return removedContact;
    } catch (error) {
        throw error.message;
    }
};

const uniqId = (contacts) => contacts.reduce((acc, el) => acc < el.id? el.id: acc, 0)+1;

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const newContact = { id: uniqId(contacts), name, email, phone };
        const updatedContacts = [...contacts, newContact];
        await contacts.push(newContact);
        console.table(updatedContacts);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
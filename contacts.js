const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactPath = path.resolve('./db/contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts(); // отримуєм масив всіх контактів
  const contact = contactsList.find(contact => contact.id.toString() === contactId)
  if (!contact) throw Error('Error search')// викидуєм різні помилки щоб знати де сталася помилка

  return contact
}

const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const newContact = {name, email, phone, id: nanoid()}
  contactsList.push(newContact)
  await fs.writeFile(contactPath, JSON.stringify(contactsList)) // перезаписуєм файл contacts.json новими даними

  return newContact;
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const filterContactsList = contactsList.filter(contact => contact.id.toString() !== contactId);// приводимо id з contacts.json в строку
  if (contactsList.length === filterContactsList.length) throw Error('Error remove')

  await updateContacts(filterContactsList)

  return 'Success remove'
}

// допоміжна ф-ція для оновлення contacts.json
async function updateContacts(newContacts) {
  await fs.writeFile(contactPath, JSON.stringify(newContacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}


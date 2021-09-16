const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');
const contacts = require('./db/contacts.json') // імпортуємо контакти в json фарматі і node сама робе конвертацію

const contactPath = path.resolve('./db/contacts.json')

const listContacts = async () => contacts;

const getContactById = async (contactId) => {
  const contactsList = await listContacts(); // отримуєм масив всіх контактів
  const contact = contactsList.find(contact => contact.id.toString() === contactId)
  if (!contact) return null;

  return contact
}

const addContact = async (data) => {
  const contactsList = await listContacts();
  const newContact = {...data, id: nanoid()}
  contactsList.push(newContact)
  await fs.writeFile(contactPath, JSON.stringify(contactsList)) // перезаписуєм файл contacts.json новими даними

  return newContact;
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const idx = contactsList.findIndex(contact => contact.id === contactId);
  if (idx === -1) return null; // сповіщаєм що такого id нема

  contactsList.splice(idx, 1); // можем "мутувати" масив так як перезаписуєм файл
  await updateContacts(contactsList)

  return 'Success remove'
}

const updateContactById = async (id, data) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(contact => contact.id === id)
  if (idx === -1) return null;

  const updateContact = {...contactsList[idx], ...data};
  contactsList[idx] = updateContact;  // масиві контактів по індексу, оновлюєм контакт
  await updateContacts(contactsList); // перезаписуємо contacts.json

  return updateContact;
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
  updateContactById,
}
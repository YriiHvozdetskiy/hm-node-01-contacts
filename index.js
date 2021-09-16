const {Command} = require('commander');
const contactsOperations = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
  try {
	switch (action) {
	  case 'list':
		return await contactsOperations.listContacts();
	  // break;

	  // case 'list':
	  // const contactsList = await contactsOperations.listContacts();
	  // console.table(contactsList)
	  // break;

	  case 'get':
		return await contactsOperations.getContactById(id)
	  // break;

	  case 'add':
		return await contactsOperations.addContact(name, email, phone)
		// break;

	  case 'remove':
		await contactsOperations.removeContact(id)
		break;

	  case 'update':
		await contactsOperations.updateContactById(id, data)
		break;

	  default:
		console.warn('\x1B[31m Unknown action type!');
	}
  } catch (error) {
	throw  error
  }
}

invokeAction(argv)
  .then(r => console.log(r))
  .catch(error => console.log(error))

// invokeAction('list')
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// const id = 5;
//
// invokeAction('get', id)
//   .then(data => console.log(data))
//   .catch(e => console.log(e))


// const newContact = {
//   name: 'Vasa',
//   email: 'vasa.prosto.diam@Donec.com',
//   phone: '(097) 344-2335',
// }

// invokeAction('add', '', newContact)
//   .then(data => console.log(data))
//   .catch(e => console.log(e))

// const updateContact = {
//   name: 'Poly',
//   email: 'poly.mango.diam@Donec.com',
//   phone: '(097) 344-2335',
// }
//
// const updateId = "B2bbIvMk6_TGsjmviamKU";
//
// invokeAction('update', updateId, updateContact)
//   .then(data => console.log(data))
//   .catch(e => console.log(e))

// const id = "B2bbIvMk6_TGsjmviamKU";
//
// invokeAction('remove', id)
//   .then(data => console.log(data))
//   .catch(e => console.log(e))
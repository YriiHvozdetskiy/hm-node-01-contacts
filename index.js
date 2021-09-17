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

	  case 'get':
		return await contactsOperations.getContactById(id)

	  case 'add':
		return await contactsOperations.addContact(name, email, phone)

	  case 'remove':
		return await contactsOperations.removeContact(id)

	  // case 'update':
		// return await contactsOperations.updateContactById(id, data)

	  default:
		console.warn('\x1B[31m Unknown action type!');
	}
  } catch (error) {
	throw  error
  }
}

invokeAction(argv)
  .then(data => console.log(data))
  .catch(error => console.log(error))

// node index -a list
// node index -a get --id 5
// node index -a add --name Mango --email mango@gmail.com --phone 322-22-22
// node index -a remove --id=3

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

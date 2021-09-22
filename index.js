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

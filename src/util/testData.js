import faker from 'faker';
import sortBy from 'sort-by';

//  Contacts
export const getContact = () => {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatarURL: faker.image.imageUrl(),
  }
}

export const getContactList = (count) => {
  const contacts = []
  for (let i = 0; i < count; i++) {
    contacts.push(getContact());
  }
  return contacts.sort(sortBy('name'));;
}
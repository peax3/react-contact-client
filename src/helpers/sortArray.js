export const sortContacts = (contacts) => {
  let contactsToSort = [...contacts];

  return contactsToSort.sort(contactComparer);
};

const contactComparer = (a, b) => {
  if (a.fullName < b.fullName) {
    return -1;
  } else if (a.fullName > b.fullName) {
    return 1;
  } else {
    return 0;
  }
};

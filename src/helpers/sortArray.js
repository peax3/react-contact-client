export const sortContacts = (contacts) => {
  let contactsToSort = [...contacts];

  return contactsToSort.sort(contactComparer);
};

const contactComparer = (a, b) => {
  if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {
    return -1;
  } else if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {
    return 1;
  } else {
    return 0;
  }
};

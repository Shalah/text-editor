import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.error('putDb implemented');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');  // This is read and write because it is a put function

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .delete() method to get all data in the database.
  const request = store.put({id: id, jate: content});

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  //return result?.value;
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');  // This is a read only because it is a get function

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .delete() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request; 
  console.log('result.value', result);
  return result; 
}

initdb();

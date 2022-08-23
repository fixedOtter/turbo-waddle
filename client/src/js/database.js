import { openDB } from 'idb';

const initdb = async () =>
  openDB('turboWaddle', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('turboWaddle')) {
        console.log('turboWaddle database already exists');
        return;
      }
      db.createObjectStore('turboWaddle', { keyPath: 'id', autoIncrement: true });
      console.log('turboWaddle database created');
    },
  });

// logic for saving to the db
export const putDb = async (content) => {
  // this opens a connecton to turboWaddle with readwrite permissions 
  const turboWaddleDb = await openDB('turboWaddle', 1);
  const tx = turboWaddleDb.transaction('turboWaddle', 'readwrite');
  const store = tx.objectStore('turboWaddle');

  // the actual req putting data into the database
  const request = store.put({content: content});

  // logging our successes
  request ? console.log(`Data saved boi!`) : console.error(`Oopsie Woopsie! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!`)
};

// logic for getting from DB
export const getDb = async () => {
  // this opens a connecton to turboWaddle with readwrite permissions 
  const turboWaddleDb = await openDB('turboWaddle', 1);
  const tx = turboWaddleDb.transaction('turboWaddle', 'readonly');
  const store = tx.objectStore('turboWaddle');

  // actual request getting everything from the database
  const data = store.getAll();

  // return result
  return await data;
};

initdb();

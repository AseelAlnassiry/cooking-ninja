import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDsF4G_NYVHbC_pWWscqXUAnCQRLe947UM',

  authDomain: 'cooking-ninja-2d844.firebaseapp.com',

  projectId: 'cooking-ninja-2d844',

  storageBucket: 'cooking-ninja-2d844.appspot.com',

  messagingSenderId: '439568221655',

  appId: '1:439568221655:web:f6103dca9e71e771457792',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB-7pS_s5V1OeIfgWgYBG4UkkWBikgA6yo",
  authDomain: "prueba-firebase-5eacc.firebaseapp.com",
  databaseURL: "https://prueba-firebase-5eacc-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "prueba-firebase-5eacc",
  storageBucket: "prueba-firebase-5eacc.firebasestorage.app",
  messagingSenderId: "504883897787",
  appId: "1:504883897787:web:945f9003cc04780730909e",
  measurementId: "G-KQ7PZ794HR"
};

// Inicializar Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const realtimeDb = getDatabase(firebaseApp);

const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Establecer la suscripción básica por defecto
    await setDoc(doc(db, 'Profiles', user.uid), {
      subscription: 'basic',
      username: user.displayName || '',
      profileImageUrl: user.photoURL || '',
      email: user.email,
      createdAt: new Date().toISOString()
    });

    console.log('Usuario creado y suscripción básica establecida');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
};

export { createUser };
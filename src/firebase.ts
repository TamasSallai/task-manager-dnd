import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const addTable = async (tableName: string) => {
  const tableId = uuidv4()
  await setDoc(doc(db, 'tables', tableId), {
    id: tableId,
    name: tableName,
  })
}

export const getTables = async () => {
  const querySnapshot = await getDocs(collection(db, 'tables'))
  return querySnapshot.docs.map((doc) => doc.data())
}

export const addColumnToTable = async (tableId: string, columnName: string) => {
  const columnId = uuidv4()
  await setDoc(doc(db, `tables`, tableId, 'columns', columnId), {
    id: columnId,
    name: columnName,
  })
}

export const getColumnsForTable = async (tableId: string) => {
  const querySnapshot = await getDocs(
    collection(db, 'tables', tableId, 'columns')
  )

  return querySnapshot.docs.map((doc) => doc.data())
}

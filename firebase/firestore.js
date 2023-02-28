import { collection, addDoc, deleteDoc, query, doc, where, getDocs, updateDoc } from "firebase/firestore";

import { firestore } from "./firebase-setup";


export async function queryEntry() {
  try {
    const docRef = await getDocs(collection(firestore, "entey"));
    return docRef;
  } catch (err) {
    console.log(err);
  }
}
export async function addEntry(item) {
  try {
    const docRef = await addDoc(collection(firestore, "entey"), item);
    return docRef;
  } catch (err) {
    console.log(err);
  }
}


export async function deleteEntry(key) {
  try {
    await deleteDoc(doc(firestore, "entey", key));
  } catch (err) {
    console.log(err);
  }
}


export async function updateEntry(key, obj) {
  try {
    await updateDoc(doc(firestore, "entey", key), obj);
  } catch (err) {
    console.log(err);
  }
}

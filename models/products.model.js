import { db } from '../config/firebase.js';

const collection = db.collection('products');

export const getAll = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getById = async (id) => {
  const doc = await collection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const create = async (data) => {
  const docRef = await collection.add(data);
  return { id: docRef.id, ...data };
};

export const remove = async (id) => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return false;
  await collection.doc(id).delete();
  return true;
};

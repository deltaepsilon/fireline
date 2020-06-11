export default function flattenDoc(doc) {
  return { __id: doc.id, __path: doc.ref.path, ...doc.data() };
}

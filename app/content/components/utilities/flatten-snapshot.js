import flattenDoc from './flatten-doc';

export default function flattenSnapshot(snapshot) {
  return snapshot.docs.map(flattenDoc);
}

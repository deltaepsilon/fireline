import { useCallback, useEffect, useMemo, useState } from 'react';

import useFirebase from './use-firebase';

export default function useAuth() {
  const firebase = useFirebase();
  const [currentUser, setCurrentUser] = useState();
  const signInWithGoogle = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);
  }, [firebase]);
  const signOut = useCallback(() => firebase.auth().signOut(), [firebase]);
  const value = useMemo(() => ({ currentUser, signInWithGoogle, signOut }), [
    currentUser,
    signInWithGoogle,
    signOut,
  ]);

  useEffect(() => firebase.auth().onAuthStateChanged(setCurrentUser), [firebase]);

  return value;
}

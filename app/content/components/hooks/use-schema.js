import { createSchema } from '../../../functions/utilities/schema';
import useFirebase from './use-firebase';
import { useMemo } from 'react';

export default function useSchema() {
  const firebase = useFirebase();

  return useMemo(() => {
    const db = firebase.firestore();

    return createSchema({ db });
  }, [firebase]);
}

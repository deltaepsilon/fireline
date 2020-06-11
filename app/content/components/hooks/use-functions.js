import useFirebase from './use-firebase';
import { useMemo } from 'react';

export default function useFunctions() {
  const firebase = useFirebase();

  return useMemo(
    () => ({
      createCustomer: function createCustomer(arg) {
        return firebase.functions().httpsCallable('createCustomer')(arg);
      },
      removePaymentMethod: function removePaymentMethod(arg) {
        return firebase.functions().httpsCallable('removePaymentMethod')(arg);
      },
      savePaymentMethod: function savePaymentMethod(arg) {
        return firebase.functions().httpsCallable('savePaymentMethod')(arg);
      },
    }),
    [firebase]
  );
}

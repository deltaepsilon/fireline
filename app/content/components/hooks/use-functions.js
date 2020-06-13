import useFirebase from './use-firebase';
import { useMemo } from 'react';

export default function useFunctions() {
  const firebase = useFirebase();

  return useMemo(
    () => ({
      cancelSubscription: function cancelSubscription(arg) {
        return firebase.functions().httpsCallable('cancelSubscription')(arg);
      },
      createCustomer: function createCustomer(arg) {
        return firebase.functions().httpsCallable('createCustomer')(arg);
      },
      removePaymentMethod: function removePaymentMethod(arg) {
        return firebase.functions().httpsCallable('removePaymentMethod')(arg);
      },
      savePaymentMethod: function savePaymentMethod(arg) {
        return firebase.functions().httpsCallable('savePaymentMethod')(arg);
      },
      subscribe: function subscribe(arg) {
        return firebase.functions().httpsCallable('subscribe')(arg);
      },
    }),
    [firebase]
  );
}

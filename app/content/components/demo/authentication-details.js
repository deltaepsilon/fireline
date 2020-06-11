import React from 'react';
import useAuth from '~/hooks/use-auth';

export default function AuthenticationDetails() {
  const { currentUser, signInWithGoogle, signOut } = useAuth();

  return !currentUser ? (
    <div>
      <p>You'll need to sign in to see the demo. Stripe needs an email address.</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  ) : (
    <div>
      <ul>
        <li>
          <span>uid: </span>
          <span>{currentUser?.uid}</span>
        </li>
        <li>
          <span>email: </span>
          <span>{currentUser?.email}</span>
        </li>
      </ul>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

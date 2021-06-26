
import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}
type AuthContextType = {
  user: User | undefined;
  signInWithGooogle: () => Promise<void>;
}

type AuthContextProviderPros = {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);//Criar  uma constante e passa dentro das () o formato da informacao 

export function AuthContextProvider(props: AuthContextProviderPros) {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    //toda vez que usar o useEffect colocar em uma constante para quando quiser desligar o eventList

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
    return () => {
      unsubscribe();
    }//descadrasta do eventList

  }, [])

  async function signInWithGooogle() {

    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)
    if (result.user) {
      const { displayName, photoURL, uid } = result.user
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGooogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
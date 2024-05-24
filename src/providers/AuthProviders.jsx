import { createContext, useEffect, useState } from "react";
import { app } from "../firease/firebase.config";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProviders = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
       }
         
       const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
       }
       
       const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
       }
    
       const logOut = () =>  {
         setLoading(true);
         return signOut(auth);
       }
       const updateUserProfile =  (name) => {
        console.log('in update function ',name)
        return updateProfile(auth.currentUser, {
            displayName: name
          })
       }
    
    const isLoginUser = (id)=>id==user?.id
   
    useEffect( ()=> {
        const unsubscribe =  onAuthStateChanged(auth , currentUser => {
                setUser(currentUser);
                console.log('current user',currentUser);
                if(currentUser)
                {
                    console.log('not null')
                


                    currentUser.name='122'
                    currentUser.lastName=''

                console.log(currentUser.displayName)
                }else {
                    console.log('null')
                }
        
                setLoading(false);
            })
           return () => {
            return unsubscribe();
           }
        },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        isLoginUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;
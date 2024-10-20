import { createContext, useEffect, useState } from "react";
import { app } from "../firease/firebase.config";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProviders = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const [owner, setOwner] = useState(null);
    const [other,setOther] = useState(null);
    const [isSelect,setIsSelect]= useState(false);
    const [curUser,setCurUser] = useState(null);
    const [loadingCurUser,setLoadingCurUser] = useState(false)

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setOwner(storedUser);
      }
    }, []);
  //  console.log('owner  in auth',owner)
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
        setOwner();
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
                // console.log('current user',currentUser);
                if(currentUser)
                {
                //  console.log('auth...')
                }else {
                    console.log('null')
                }
        
                setLoading(false);
            })
           return () => {
            return unsubscribe();
           }
        },[])

    useEffect(()=>{
      if(owner?.email){
        fetch(`http://localhost:5000/users/${owner?.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON response asynchronously
        })
        .then((user) => {
          console.log("User data: --- infolol", user); 
          setCurUser(user)
        })
        .catch((error) => {
          console.error("Error:", error); 
        });
       }
    },[owner?.email])

    const [dp,setDp] = useState('') 
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        isLoginUser,
        setOwner,
        owner,
        dp,
        setDp,
        other,
        setOther,
        isSelect,
        setIsSelect,
        curUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;
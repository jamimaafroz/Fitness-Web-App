import React, { useEffect, useState } from "react";
import { AuthContexts } from "./AuthContexts";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.init";
import useAxios from "../../Hooks/useAxios"; // <-- added this import

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios(); // <-- initialize axios instance

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch full user profile from backend by email
          const res = await axiosInstance.get(
            `/users/search?email=${currentUser.email}`
          );

          if (res.data && res.data.length > 0) {
            setUser(res.data[0]); // Set full user info including role, last login, profile pic
          } else {
            setUser(currentUser); // fallback to Firebase user object
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUser(currentUser); // fallback if fetch fails
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, [axiosInstance]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContexts.Provider value={authInfo}>{children}</AuthContexts.Provider>
  );
};

export default AuthProvider;

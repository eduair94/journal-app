import { UserLI, UserRI } from "../store/auth";
import { FirebaseAuth } from "./config";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

interface FirebaseError {
    code: string;
    message: string;
    // You can add more specific fields if needed
  }

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const user = result.user;
        const { displayName, email, photoURL, uid} = user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        }
    } catch(error: unknown) {
        return {
            ok: false,
            errorMessage: (error as FirebaseError).message
        }
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}: UserRI) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const user = userCredential.user;
            const {photoURL, uid} = user;
            await updateProfile(user, {
                displayName
            })
            return {
                ok: true,
                displayName,
                email,
                photoURL,
                uid,
            }
        } catch(error) {
            return {
                ok: false,
                errorMessage: (error as FirebaseError).message
            }
        }
}

export const loginUserWithEmailPassword = async ({email, password}: UserLI) => {
    try {
        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const user = userCredential.user;
        const {displayName, photoURL, uid} = user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        }
    } catch(error) {
        return {
            ok: false,
            errorMessage: (error as FirebaseError).message
        }
    }
}

export const logoutFromFirebase = async () => {
    try {
        await FirebaseAuth.signOut();
        return {
            ok: true,
        }
    } catch(error) {
        return {
            ok: false,
            errorMessage: (error as FirebaseError).message
        }
    }
}
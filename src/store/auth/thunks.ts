import { deleteDoc, doc } from "firebase/firestore/lite"
import { UserI, UserLI, UserRI, checkingCredentials, login, logout } from "."
import { AppDispatch, RootState } from ".."
import { loginUserWithEmailPassword, logoutFromFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout, deleteNoteById, setSaving } from "../journal"
import { FirebaseDB } from "../../firebase/config"

export const checkingAuthentication = (email:string, password:string) => {
    return async(dispatch:AppDispatch) => {
        dispatch(checkingCredentials());
        const result = await loginUserWithEmailPassword({email, password});
        if(!result.ok) {
            dispatch(logout({errorMessage: result.errorMessage as string}));
            return;
        }
        dispatch(login(result as UserI));
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch:AppDispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if(!result.ok) {
            dispatch(logout({errorMessage: result.errorMessage as string}));
            return;
        }
        dispatch(login(result as UserI));
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}: UserRI) => {
    return async(dispatch:AppDispatch) => {
        dispatch(checkingCredentials());
        const result = await registerUserWithEmailPassword({email, password, displayName});
        if(!result.ok) {
            dispatch(logout({errorMessage: result.errorMessage as string}));
            return;
        }
        dispatch(login( {email: result.email, displayName: result.displayName, uid: result.uid} as UserI));
    }   
}

export const startLoginWithEmailPassword = ({email, password}: UserLI) => {
    return async(dispatch:AppDispatch) => {
        dispatch(checkingCredentials());
        const result = await loginUserWithEmailPassword({email, password});
        if(!result.ok) {
            dispatch(logout({errorMessage: result.errorMessage as string}));
            return;
        }
        dispatch(login({email: result.email, displayName: result.displayName, uid: result.uid} as UserI));
    }
}

export const startLogout = () => {
    return async(dispatch:AppDispatch) => {
        const result = await logoutFromFirebase();
        if(!result.ok) {
            return;
        }
        dispatch(clearNotesLogout());
        dispatch(logout({errorMessage: null}));
    }
}

export const startDeletingNote = () => {
    return async(dispatch:AppDispatch, getState: () => RootState) => {
        dispatch(setSaving());
        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note?.id}`)
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note?.id as string))
    }
}
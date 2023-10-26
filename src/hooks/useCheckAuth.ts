import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { RootState, AppDispatch } from "../store";
import { logout, login, UserI } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
    const { status } = useSelector((state: RootState) => state.auth);

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, (user) => {
        if (!user) return dispatch(logout({}));
        const { uid, email, displayName, photoURL } = user;	
        dispatch(login({ uid, email, displayName, photoURL } as UserI));
        dispatch(startLoadingNotes());
      });
      return () => {};
    }, [dispatch]);

    return {status}
}
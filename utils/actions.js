import { firebaseApp } from './firebase'
import firebase from 'firebase'
require('firebase/firestore')

const db = firebase.firestore(firebaseApp)

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = {statusResponse: true, error: null};

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        result.statusResponse = false;
        result.error = "Usuario y/o contraseña inválidos.";
    }

    return result;
}

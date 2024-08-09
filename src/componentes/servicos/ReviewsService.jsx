import { db } from '../../firebaseConfig';
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getReviewsFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'reviews'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                livro: doc.data().livro,
                autor: doc.data().autor,
                formato: doc.data().formato,
                avaliacao: doc.data().avaliacao,
                resenha: doc.data().resenha,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getReviewsUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "reviews");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                livro: doc.data().livro,
                autor: doc.data().autor,
                formato: doc.data().formato,
                avaliacao: doc.data().avaliacao,
                resenha: doc.data().resenha,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteReviewFirebase = async objeto => {
    try {
        const reviewDocRef = doc(db, 'reviews', objeto.id)
        await deleteDoc(reviewDocRef);
    } catch (err) {
        throw err;
    }
}

export const addReviewFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'reviews'),
            {
                livro: objeto.livro,
                autor: objeto.autor,
                formato: objeto.formato,
                avaliacao: objeto.avaliacao,
                resenha: objeto.resenha,
                uid: objeto.uid,
                usuario: objeto.usuario,
                email: objeto.email
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updateReviewFirebase = async objeto => {
    try {
        const reviewDocRef = doc(db, 'reviews', objeto.id)
        await updateDoc(reviewDocRef, {
            livro: objeto.livro,
            autor: objeto.autor,
            formato: objeto.formato,
            avaliacao: objeto.avaliacao,
            resenha: objeto.resenha,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
        })
    } catch (err) {
        throw err;
    }
}
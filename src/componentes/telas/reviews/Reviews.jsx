import { useState, useEffect } from "react";
import ReviewsContext from "./ReviewsContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    deleteReviewFirebase, addReviewFirebase,
    updateReviewFirebase, getReviewsUIDFirebase
} from '../../servicos/ReviewsService';
import { Navigate } from "react-router-dom";

function Reviews() {

    const [user, loading, error] = useAuthState(auth);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "",
        livro: "",
        autor: "",
        formato: "",
        avaliacao: "",
        resenha: "",
        uid: user?.uid,
        usuario: user?.displayName,
        email: user?.email
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: "",
            livro: "",
            autor: "",
            formato: "",
            avaliacao: "",
            resenha: "",
            uid: user?.uid,
            usuario: user?.displayName,
            email: user?.email
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if(objeto.avaliacao <= 0) {
            setAlerta({
                status: "error", message: "Erro ao criar o review: a avaliação não foi informada!"
            });
            return;
        }
        if (editar) {
            try {
                await updateReviewFirebase(objeto);
                setAlerta({
                    status: "success", message: "Review atualizado com sucesso"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao atualizar o review: "
                        + err
                });
            }
        } else { // novo
            try {
                setObjeto(await addReviewFirebase(objeto));
                setEditar(true);
                setAlerta({
                    status: "success", message: "Review criado com sucesso"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao criar o review: " +
                        err
                });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deleteReviewFirebase(objeto);
                setAlerta({
                    status: "success", message: "Review removido com sucesso!"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao remover: " + err
                });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getReviewsUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);

    if (user) {
        return (
            <ReviewsContext.Provider value={{
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                remover,
                objeto, setObjeto,
                editarObjeto, novoObjeto, acaoCadastrar,
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
                <Form />
            </ReviewsContext.Provider>
        )
    } else {
        return <Navigate to="/" />;
    }
}

export default Reviews;
import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import ReviewsContext from "./ReviewsContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";
import CampoEstrelas from "../../comuns/CampoEstrelas";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(ReviewsContext);

    return (
        <Dialogo id="modalEdicao" titulo="Organização"
            open={abreDialogo} setOpen={setAbreDialogo}
            acaoCadastrar={acaoCadastrar} idform="formulario"
            maxWidth="sm">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtID" label="ID"
                tipo="text" name="id" value={objeto.id}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtLivro" label="Título do livro"
                tipo="text" name="livro" value={objeto.livro}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Livro OK"
                msginvalido="Informe o autor do livro" />
            <CampoEntrada id="txtAutor" label="Autor do livro"
                tipo="text" name="autor" value={objeto.autor}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Autor OK"
                msginvalido="Informe o autor do livro" />
            <CampoSelect
                id="selectFormato" label="Formato do livro"
                idLabel="labelFormato"
                tipo="text" name="formato" value={objeto.formato}
                onchange={handleChange} requerido={false}
                msgvalido="Formato OK"
                msginvalido="Informe o formato do livro">
                <MenuItem value='Físico'>Físico</MenuItem>
                <MenuItem value='eBook'>eBook</MenuItem>
            </CampoSelect>
            <CampoEstrelas
                id="startsAvaliacao"
                label="Avaliação"
                name="avaliacao"
                value={objeto.avaliacao}
                onChange={handleChange}
                msginvalido="Informe a sua avaliação em estrelas"
                msgvalido="Avaliação OK"
            />
            <CampoEntradaTexto id="txtResenha" label="Resenha"
                rows={5}
                tipo="text" name="resenha"
                value={objeto.resenha}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={100}
                msgvalido="Resenha OK"
                msginvalido="Informe a sua resenha" />
        </Dialogo>
    )

}

export default Form;
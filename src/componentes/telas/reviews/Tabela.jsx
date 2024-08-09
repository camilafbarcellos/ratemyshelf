import { useContext, useMemo } from "react";
import PostsContext from "./ReviewsContext";
import Alerta from "../../comuns/Alerta";
import { MaterialReactTable } from 'material-react-table';
import { MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';

function Tabela() {

    const { alerta, listaObjetos, remover, editarObjeto, novoObjeto }
        = useContext(PostsContext);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'livro',
                header: 'Título do livro'
            },
            {
                accessorKey: 'autor',
                header: 'Autor do livro'
            },
            {
                accessorKey: 'formato',
                header: 'Formato do livro'
            },
            {
                accessorKey: 'avaliacao',
                header: 'Avaliação'
            },
            {
                accessorKey: 'resenha',
                header: 'Resenha'
            },
            {
                accessorKey: 'usuario',
                header: 'Usuário'
            },
            {
                accessorKey: 'email',
                header: 'Email'
            },
            {
                accessorKey: 'uid',
                header: 'UID'
            },
        ],
        [],
    );

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5">
                Meus reviews
            </Typography>
            <Alerta alerta={alerta} />
            <Button variant="contained"
                onClick={() => novoObjeto()}>
                <AddIcon />&nbsp; Novo
            </Button>
            {listaObjetos.length === 0 &&
                <Typography variant="h6">
                    Nenhum review encontrado...
                </Typography>}
            {listaObjetos.length > 0 && (
                <MaterialReactTable
                    enableGlobalFilter={true}
                    showColumnFilters={true}
                    columns={columns}
                    data={listaObjetos}
                    enableColumnFilters={true}
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            header: 'Ações',
                            enableColumnFilter: false
                        }
                    }}
                    enableRowActions
                    renderRowActionMenuItems={({ row }) => <div>
                        <MenuItem key="editar"
                            onClick={() => editarObjeto(row.original)}
                            title="Editar"><EditIcon /></MenuItem>
                        <MenuItem key="remover"
                            onClick={() => remover(row.original)}
                            title="Apagar"><DeleteIcon /></MenuItem>
                    </div>}
                />
            )}
        </div>
    )

}

export default Tabela;
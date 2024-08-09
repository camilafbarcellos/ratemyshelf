import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import { getReviewsFirebase } from '../../servicos/ReviewsService';
import { Divider, Stack } from '@mui/material';

function Home() {

    const [listaObjetos, setListaObjetos] = useState([]);

    useEffect(() => {
        getReviewsFirebase(setListaObjetos);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="div">
                Reviews disponíveis
            </Typography>
            {listaObjetos.length === 0 && <Typography variant="h6" component="div">
                Nenhum review encontrado...
            </Typography>}

            <Grid container spacing={2}>
                {listaObjetos.length > 0 && (
                    listaObjetos.map(objeto => (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={objeto.id}>
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5" component="div">
                                            {objeto.livro}
                                        </Typography>
                                        <Typography color="text.secondary" variant='caption' sx={{ mb: 1.5 }}>
                                            {objeto.formato}
                                        </Typography>
                                    </Stack>
                                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                                        {objeto.autor}
                                    </Typography>
                                    <Rating
                                        name={`rating-${objeto.id}`}
                                        value={objeto.avaliacao}
                                        readOnly
                                        precision={0.5}
                                    />
                                    <Typography variant='body1' sx={{ mt: 1.5 }}>
                                        <i>"{objeto.resenha}"</i>
                                    </Typography>
                                    <Divider sx={{ margin: 1.5 }} />
                                    <Typography variant="h7" component="div">
                                        {objeto.usuario}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {objeto.email}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))

                )}
            </Grid>
        </div>
    )
}

export default Home;

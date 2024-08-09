import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Sobre = () => {

    return (

        <div style={{ padding: '20px' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container alignContent={'center'} justifyContent={'center'}
                >
                    <Grid item xs={12} sm={12} md={6}>
                        <Card sx={{ minWidth: 50 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Rate My Shelf: aplicativo para review de livros
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Trabalho avaliativo da disciplina de Linguagens de Programação Emergentes (LPE)
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    IFSul - Passo Fundo (2024/1)
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Professor: Jorge Luis Boeira Bavaresco
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Camila F. Barcellos
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    GitHub: camilafbarcellos
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Data da entrega
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    13/08/2024
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>

    )

}

export default Sobre;
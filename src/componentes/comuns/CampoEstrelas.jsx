import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function CampoEstrelas({ id, label, name, value, onChange, msginvalido }) {
    return (
        <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">{label}</Typography>
            <Stack direction="column">
                <Rating
                    name={name}
                    id={id}
                    value={Number(value)}
                    onChange={onChange}
                    precision={0.5}
                    size='large'
                />
                {value <= 0 && (
                    <Typography variant="caption" color="error">{msginvalido}</Typography>
                )}
            </Stack>
        </Box>
    );
}

export default CampoEstrelas;

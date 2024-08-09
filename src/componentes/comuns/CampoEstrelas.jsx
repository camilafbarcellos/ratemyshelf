import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function CampoEstrelas({ id, label, name, value, onChange, readonly, requerido, msginvalido }) {
    return (
        <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">{label}</Typography>
            <Rating
                name={name}
                id={id}
                value={Number(value)}
                onChange={onChange}
                readOnly={readonly}
                required={requerido}
                precision={0.5}
            />
            {requerido && value === null && (
                <Typography color="error">{msginvalido}</Typography>
            )}
        </Box>
    );
}

export default CampoEstrelas;

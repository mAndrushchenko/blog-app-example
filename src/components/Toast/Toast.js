import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Toast({ status = false, message = '', type = 'success', duration = 3000, setStatus }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStatus(false)
    };
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={status} autoHideDuration={duration} onClose={handleClose}>
                <Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

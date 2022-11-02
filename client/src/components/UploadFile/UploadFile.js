import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export default function UploadFile() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant='contained' component="label">
                Upload 
                <input hidden accept='image/*' type="file"/>
            </Button>
        </Stack>
    )
}
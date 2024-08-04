import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

function PageUnderConstruction() {
    return (
        <Container>
            <Box textAlign="center" mt={5}>
                <ConstructionIcon style={{ fontSize: 80, color: 'orange' }} />
                <Typography variant="h3" gutterBottom>
                    Under Construction
                </Typography>
                <Typography variant="body1">
                    This page is currently under construction. Please check back later.
                </Typography>
            </Box>
        </Container>
    );
}

export default PageUnderConstruction;

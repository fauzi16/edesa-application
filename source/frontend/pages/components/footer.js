import React from 'react';
import {Grid,Container} from '@mui/material';
const Footer = () => {
    return(typeof window !== 'undefined'  ?
        <Container>
            <Grid container spacing={2} style={{marginTop:'5px', borderTop:'1px solid #ebebeb'}}>
                <Grid item md={12}>
                    <div className="text-menus">
                        ┬ęCopyright 2022 Desa Manud Jaya. All Rights Reserved.
                    </div>
                </Grid>
            </Grid>
        </Container> : null
    )
}

export default Footer;
import React, {useState, Fragment} from 'react';
import {Grid} from '@mui/material';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
const Cctv = () => {
    return(
        <Fragment>
            <Head title="CCTV - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className="heading-2">CCTV</div>
                            </Grid>
                        </Grid>   
                        <br/>
                        <iframe 
                            src='https://www.youtube.com/embed/ffu93KhnSKg?autoplay=1'
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            width="700" 
                            height="500"
                            title='video'
                            closeButton
                        />
                        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Cctv;
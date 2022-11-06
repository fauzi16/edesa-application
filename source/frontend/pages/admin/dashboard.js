import React, {Fragment, useContext, useState} from 'react';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import UserContext from '../../utils/UserContext';
import {Modal, Paper, Button, Grid} from '@mui/material';

const Dashboard = () => {
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const style = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
      
    return(
        <Fragment>
            <Head title="Dashboard - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content" style={{display: 'flex', alignItems:'center', flexDirection:'column'}}>
                        <h1>HALO, {user?.user?.name}</h1>
                        <br/>
                        <h1>SELAMAT DATANG DI <span className="text-primary">E-DESA</span></h1>
                        <br/><br/>
                        {user?.user?.roleId === 3 &&
                            <div className="text-center">
                                <a onClick={()=>setOpen(true)}>
                                    <img src="/panic.png" width="200"/>
                                </a>
                            </div>
                        }        
                    </div>
                    <Footer/>
                    <Modal
                        open={open}
                        onClose={()=> setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Paper sx={style}>
                            <h3>Jelaskan Masalahmu</h3>
                            <hr/>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <div className="form-group m-t-10">
                                            <label className="font-bold">Deskripsi<span className="text-danger">*</span></label>
                                            <textarea className="form-control form-swantik" rows={4}></textarea>
                                        </div>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Button variant="contained" color="primary" type="submit">Adukan</Button>
                            </form>
                        </Paper>
                    </Modal>

                </div>
            </div>
        </Fragment>
    )
}
export default Dashboard;
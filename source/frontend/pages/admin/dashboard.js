import React, {Fragment, useContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import UserContext from '../../utils/UserContext';
import {Modal, Paper, Button, Grid, Alert} from '@mui/material';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import axios from 'axios';
import { cookie } from '../../utils/global';
import { TOKEN } from '../../utils/constant';
const Dashboard = () => {
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [residence, setResidence] = useState([]);
    const [idAdmin, setIdAdmin] = useState('');
    const [status, setStatus] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const style = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        height: '80vh',
        overflowY:'auto',
    };
    const getResidence = () => {
        const url = `http://103.176.78.92:8080/residences`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setResidence(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }
    useEffect(()=>{
        getResidence();
    },[])
    useEffect(()=>{
        const url = `http://103.176.78.92:8080/users/find-by-username`;
        const data = {
            username:user?.user?.email
        }
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.post(url, data, head)
        .then(function (response) {
            setIdAdmin(response.data)
        })
        .catch(function (error) {
            console.log(error)
        });
    },[user?.user?.email])
    const schema = Yup.object().shape({
        description: Yup.string().required('Deskripsi wajib diisi'),
        residenceId: Yup.string().required('Residence wajib diisi'),
    });
    const initialValues = {
        description: '',
        residenceId: 0,
    };

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://103.176.78.92:8080/panic-button/push-panic-button`;
            const data ={
                description: values.description,
                reporterId: idAdmin?.id,
                residenceId: Number(values.residenceId),
            }
            const head = {
                headers: {
                    'Authorization': `Bearer ${cookie.get(TOKEN)}`
                }
            }
            axios.post(url, data, head)
            .then(function (response) {
                if (response.status !== 200) {
                    setStatus(true);
                    setSeverity('error')
                    setMessage('Terjadi kesalahan. Perbaiki isian Anda')
                } else {
                    setStatus(true);
                    setSeverity('success')
                    setMessage('Berhasil Menugaskan Pengaduan')
                    setTimeout(() => {        
                        router.push("/admin/pelaporan_admin")
                    }, 200);
                }
            })
            .catch(function (error) {
                console.log(error)
            });
        },
    });
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
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <div className="form-group m-t-10">
                                            <label className="font-bold">Deskripsi<span className="text-danger">*</span></label>
                                            <textarea className="form-control form-swantik" rows={4} value={formik.values.description} onChange={(e)=> formik.setFieldValue('description', e.target.value)}></textarea>
                                            {formik.errors.description && formik.touched.description ?
                                                <div className="text-danger text-sm ">{formik.errors.description}</div> : null
                                            }
                                        </div>
                                        <div className="form-group m-t-10">
                                            <label className="font-bold">Residence<span className="text-danger">*</span></label>
                                            <select className="form-control form-swantik" value={formik.values.residenceId} onChange={(e) => formik.setFieldValue('residenceId', e.target.value)}>
                                                <option value="">--Pilih Residence--</option>
                                                {residence?.map((data, index)=>
                                                    <option key={index} value={data.id}>{data.name}</option>
                                                )}
                                            </select>
                                            {formik.errors.residenceId && formik.touched.residenceId ?
                                                <div className="text-danger text-sm ">{formik.errors.residenceId}</div> : null
                                            }
                                        </div>
                                    </Grid>
                                </Grid>
                                {status && <Alert severity={severity}>{message}</Alert>}
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
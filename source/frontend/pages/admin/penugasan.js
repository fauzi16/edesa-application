import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Grid, Button, Alert} from '@mui/material';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import {useRouter} from 'next/router';
import axios from 'axios';
import UserContext from '../../utils/UserContext';
import { cookie } from '../../utils/global';
import { TOKEN } from '../../utils/constant';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import { first } from 'lodash';
const Penugasan = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [status, setStatus] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [business, setBusiness] = useState([]);
    const [residence, setResidence] = useState([]);
    const [idAdmin, setIdAdmin] = useState('');
    const [users, setUsers] = useState({});
    const id = router.query.id;

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

    const getBusiness = () => {
        const url = `http://103.176.78.92:8080/businessUnits`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setBusiness(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }

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
    const getUser = () => {
        const url = `http://103.176.78.92:8080/users`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            let data = [];
            resp.data.filter((a)=>a.userInfoId == id).map((d)=>
                data.push(d)
            )
            setUsers(data)
        }).catch(err => {
            console.log('err', err)
        });  
    }
    useEffect(()=>{
        getBusiness();
        getResidence();
        getUser();
    },[])
    
    const schema = Yup.object().shape({
        businessId: Yup.string().required('Perangkat desa wajib diisi'),
        residenceId: Yup.string().required('Residence wajib diisi'),
    });
    const initialValues = {
        businessId: 0,
        residenceId:0,
    };

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://103.176.78.92:8080/issue/step2-penugasan-laporan-oleh-admin`;
            const data ={
                adminId: idAdmin.id,
                businessUnitId: values.businessId,
                issueId: first(users)?.userInfoId,
                residenceId: values.residenceId,
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
            <Head title="Penugasan - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <div className="heading-2">Penugasan</div>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Divisi<span className="text-danger">*</span></label>
                                        <select className="form-control form-swantik" value={formik.values.businessId} onChange={(e) => formik.setFieldValue('businessId', e.target.value)}>
                                            <option value="">--Pilih Bisnis Unit--</option>
                                            {business?.map((data, index)=>
                                                <option key={index} value={data.id}>{data.name}</option>
                                            )}
                                        </select>
                                        {formik.errors.businessId && formik.touched.businessId ?
                                            <div className="text-danger text-sm ">{formik.errors.businessId}</div> : null
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
                            <br/>
                            {status && <Alert severity={severity}>{message}</Alert>}
                            <br/>
                            <Button variant="contained" color="primary" type="submit">Simpan</Button>
                            <br/><br/> 
                        </form>        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Penugasan;
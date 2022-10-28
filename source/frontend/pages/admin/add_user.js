import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Grid, Button} from '@mui/material';
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
const AddUser = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [status, setStatus] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [merchantId, setMerchantId] = useState('');
    const schema = Yup.object().shape({
        name: Yup.string().required('Nama perangkat desa wajib diisi'),
        alamat: Yup.string().required('Alamat wajib diisi'),
        phone: Yup.string().required('Nomor HP wajib diisi'),
        email: Yup.string().email('Format email salah').required('Email wajib diisi'),
        businessUnit: Yup.string().required('Divisi wajib diisi'),
    });
    const initialValues = {
        name:'',
        alamat:'',
        phone: '',
        email:'',
        businessUnit:'',
    };
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://localhost:8080/users`;
            const data = {
                alamat: values.alamat,
                businessUnit: values.businessUnit,
                email: values.email,
                hp: values.hp,
                name: values.name
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
                    setMessage('Berhasil mendaftarkan Warga')
                    setTimeout(() => {        
                        router.push("/admin/user")
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
            <Head title="Tambah User - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <div className="heading-2">Tambah User</div>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Nama<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan nama" value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)}/>
                                        {formik.errors.name && formik.touched.name ?
                                            <div className="text-danger text-sm ">{formik.errors.name}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Alamat<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan alamat" value={formik.values.alamat} onChange={(e) => formik.setFieldValue('alamat', e.target.value)}/>
                                        {formik.errors.alamat && formik.touched.alamat ?
                                            <div className="text-danger text-sm ">{formik.errors.alamat}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Nomor HP<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan nomor HP" value={formik.values.phone} onChange={(e) => formik.setFieldValue('phone', e.target.value)}/>
                                        {formik.errors.phone && formik.touched.phone ?
                                            <div className="text-danger text-sm ">{formik.errors.phone}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Email<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan email" value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)}/>
                                        {formik.errors.email && formik.touched.email ?
                                            <div className="text-danger text-sm ">{formik.errors.email}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Divisi<span className="text-danger">*</span></label>
                                        <select className="form-control form-swantik" value={formik.values.businessUnit} onChange={(e) => formik.setFieldValue('businessUnit', e.target.value)}>
                                            <option value="1">Dinas Kebersihan</option>
                                            <option value="2">Dinas Keamanan</option>
                                            <option value="3">Dinas Pertamanan</option>
                                        </select>
                                        {formik.errors.businessUnit && formik.touched.businessUnit ?
                                            <div className="text-danger text-sm ">{formik.errors.businessUnit}</div> : null
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                            <br/><br/>
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
export default AddUser;
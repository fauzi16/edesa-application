import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import { useRouter } from 'next/router';
import Head from './components/head';
import * as Yup from 'yup';
import axios from 'axios';
import {Grid, Button, Alert, Container, Card, CardContent} from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';
import {dateDefault} from '../utils/helpers';
const Register = () => {
    const [status, setStatus] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const schema = Yup.object().shape({
        email: Yup.string().required('email wajib diisi'),
        password: Yup.string()
        .min(6, 'Password minimal 6 karakter')
        .required('Password wajib diisi'),
        password_confirmation: Yup.string()
            .min(6, 'Password minimal 6 karakter')
            .required('Konfirmasi password wajib diisi')
            .oneOf([Yup.ref('password'), null], 'Password harus sama'),
        dateOfBirth: Yup.string().required('Tanggal lahir wajib diisi'),
        name: Yup.string().required('Nama wajib diisi'),
        address: Yup.string().required('Alamat wajib diisi'),
        phone: Yup.string().required('Nomor HP wajib diisi'),
    });
    const initialValues = {
        email: '',
        password: '',
        dateOfBirth: new Date(),
        name: '',
        password_confirmation: '',
        phone:'',
        address:'',
    };
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = 'http://168.138.181.227:8080/registration/customer';
            const data = {
                dateOfBirth: dateDefault(values.dateOfBirth),
                email: values.email,
                name: values.name,
                password: values.password,
                address: values.address,
                phone: values.phone
              }
            axios.post(url, data)
                .then(function (response) {
                    if (response.status !== 200) {
                        setStatus(true);
                        setSeverity('error')
                        setMessage('Terjadi kesalahan. Perbaiki isian Anda')
                    } else {
                        setStatus(true);
                        setSeverity('success')
                        setMessage('Berhasil mendaftarkan Customer')
                        setTimeout(() => {        
                            router.push(`/verify-code?email=${values.email}`)
                        }, 200);
                        
                    }
                })
                .catch(function (error) {
                    if (error.response.status !== 200) {
                        setStatus(false);
                    } else {
                        setStatus(true);
                    }
                });
        },
    });
    return(
        <div className="bg-primary">
            <Head title="Register - SIPENGADU" />
            <Container>
              <Grid container spacing={2}>
                <Grid item md={7} sm={6} xs={12}>
                  <h1 className="text-white">SIPENGADU</h1>
                  <hr className="text-white"/>
                  <div className="m-t-20 text-white">
                    SIPENGADU dibentuk untuk merealisasikan kebijakan 
                    “no wrong door policy” yang menjamin hak masyarakat agar 
                    pengaduan dari manapun dan jenis apapun akan disalurkan 
                    kepada penyelenggara pelayanan publik yang berwenang 
                    menanganinya. SIPENGADU bertujuan agar:
                    <ol>
                      <li>Penyelenggara dapat mengelola pengaduan dari masyarakat secara sederhana, cepat, tepat, tuntas, dan terkoordinasi dengan baik;</li>
                      <li>Penyelenggara memberikan akses untuk partisipasi masyarakat dalam menyampaikan pengaduan; dan</li>
                      <li>Meningkatkan kualitas pelayanan publik.</li>
                    </ol>
                  </div>
                </Grid>
                <Grid item md={5} sm={6} xs={12}>
                    <Card>
                        <CardContent className="p-l-20 p-r-20 p-t-20 p-b-20">
                            <center>
                                <div className="heading-1 m-b-20">DAFTAR</div>
                            </center>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <label className="font-semibold">Nama</label>
                                    <input type="text" className="form-control form-swantik" placeholder="Masukkan nama" value={formik.values.name} onChange={(e)=>formik.setFieldValue('name', e.target.value)}/>
                                    {formik.errors.name && formik.touched.name ?
                                        <div className="text-sm text-danger">{formik.errors.name}</div>:null
                                    }
                                </div>
                                <div className="form-group">
                                    <label className="font-semibold">Email</label>
                                    <input type="email" className="form-control form-swantik" placeholder="Masukkan email aktif" value={formik.values.email} onChange={(e)=>formik.setFieldValue('email', e.target.value)}/>
                                    {formik.errors.email && formik.touched.email ?
                                        <div className="text-sm text-danger">{formik.errors.email}</div>:null
                                    }
                                </div>
                                <div className="form-group">
                                    <label className="font-semibold">Nomor HP</label>
                                    <input type="number" className="form-control form-swantik" placeholder="Masukkan nomor hp" value={formik.values.hp} onChange={(e)=>formik.setFieldValue('hp', e.target.value)}/>
                                    {formik.errors.hp && formik.touched.hp ?
                                        <div className="text-sm text-danger">{formik.errors.hp}</div>:null
                                    }
                                </div>
                                <div className="form-group">
                                    <label className="font-semibold">Alamat</label>
                                    <input type="text" className="form-control form-swantik" placeholder="Masukkan alamat" value={formik.values.address} onChange={(e)=>formik.setFieldValue('address', e.target.value)}/>
                                    {formik.errors.address && formik.touched.address ?
                                        <div className="text-sm text-danger">{formik.errors.address}</div>:null
                                    }
                                </div>
                                <div className="form-group">
                                    <label className="font-semibold">Tanggal Lahir</label>
                                    <DatePicker
                                        selected={formik.values.dateOfBirth}
                                        onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control form-swantik"
                                        showYearDropdown
                                        yearDropdownItemNumber={50}
                                        scrollableYearDropdown
                                    />
                                    {formik.errors.dateOfBirth && formik.touched.dateOfBirth ?
                                        <div className="text-sm text-danger">{formik.errors.dateOfBirth}</div>:null
                                    }
                                </div>
                                <div className="form-group">
                                    <label className="font-semibold">Password</label>
                                    <input type="password" className="form-control form-swantik" placeholder="Masukkan password" value={formik.values.password} onChange={(e)=>formik.setFieldValue('password', e.target.value)}/>
                                    {formik.errors.password && formik.touched.password ?
                                        <div className="text-sm text-danger">{formik.errors.password}</div>:null
                                    }
                                </div>
                                <div className="form-group">
                                    <label className="font-semibold">Konfirmasi Password</label>
                                    <input type="password" className="form-control form-swantik" placeholder="Masukkan konfirmasi password" value={formik.values.password_confirmation} onChange={(e)=>formik.setFieldValue('password_confirmation', e.target.value)}/>
                                    {formik.errors.password_confirmation && formik.touched.password_confirmation ?
                                        <div className="text-sm text-danger">{formik.errors.password_confirmation}</div>:null
                                    }
                                </div>
                                <br/>
                                {status && <Alert severity={severity}>{message}</Alert>}
                                <br/>
                                <Button variant="contained" color="primary" fullWidth type="submit">Buat Akun</Button>
                                <center className="m-t-20">
                                    Sudah punya akun? <Link href="/"><a className="link">Masuk disini</a></Link>
                                </center>
                            </form>
                      </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
        </div>
    )
}
export default Register;
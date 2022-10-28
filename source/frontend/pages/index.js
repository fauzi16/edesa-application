import React, {useState, useEffect, useContext } from 'react';
import {withRouter,useRouter} from 'next/router';
import Head from './components/head';
import {Container, Card, CardContent, Grid, Button, Alert} from '@mui/material';
import Image from 'next/image';
import {useFormik} from 'formik';
import axios from 'axios';
import Link from 'next/link';
import * as Yup from 'yup';
import { cookie } from '../utils/global';
import { TOKEN } from '../utils/constant';
import UserContext from '../utils/UserContext';
import ls from 'local-storage';
const Index = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState(true);
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const schema = Yup.object().shape({
        email: Yup.string().email('Format email salah').required('email wajib diisi'),
        password: Yup.string().required('Password wajib diisi'),
    });
    const initialValues = {
        email: '',
        password: '',
    };
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (values, action) => {
            setIsLoading(true)
            const data = {
                username: values.email, 
                password: values.password
            }
            axios.post('http://localhost:8080/authenticate2', data)
                .then(function (response) {
                    console.log(response)
                    if (response.status !== 200) {
                        setStatus(true);
                        setSeverity('error');
                        setMessage('Periksa kembali email dan password Anda');
                    } else {
                        setStatus(true);
                        setSeverity('success');
                        setMessage('Berhasil login');
                        cookie.set(TOKEN, response.data.jwttoken, { path: '/' });
                        ls.set('token', response.data.jwttoken)
                        const head = {
                            headers: {
                                'Authorization': `Bearer ${response.data.jwttoken}`
                            }
                        }
                        const data =  {
                            email: values.email
                        }
                        axios.post('http://localhost:8080/userInfos/find-alldata-by-sample', data, head)
                            .then(resp => {
                                user.setUser(resp.data && resp.data[0])
                                ls.set('user', resp.data && resp.data[0])
                                router.push("/admin/dashboard")
                            }).catch(err => console.log('err', err));      
                        
                    }
                })
                .catch(function (error) {
                    if (error?.response?.data?.status !== 200) {
                        setStatus(true);
                        setSeverity('error')
                        setMessage(error?.response?.data?.message)
                    }
                });
        }
    });
    return(
        <div className="bg-primary">
            <Head title="Login - E-DESA" />
            <Container style={{height:'100vh'}}>
              <Grid container spacing={2}>
                <Grid item md={7} sm={6} xs={12}>
                  <h1 className="text-white">E-DESA</h1>
                  <hr className="text-white"/>
                  <div className="m-t-20 text-white">
                    E-DESA dibentuk untuk merealisasikan kebijakan 
                    “no wrong door policy” yang menjamin hak masyarakat agar 
                    pengaduan dari manapun dan jenis apapun akan disalurkan 
                    kepada penyelenggara pelayanan publik yang berwenang 
                    menanganinya. E-DESA bertujuan agar:
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
                              <div className="heading-1 m-b-20">MASUK</div>
                          </center>
                          <form onSubmit={formik.handleSubmit}>
                              <div className="form-group">
                                  <label className="font-semibold">Email</label>
                                  <input type="text" className="form-control form-swantik" placeholder="Masukkan email" value={formik.values.email} onChange={(e)=>formik.setFieldValue('email', e.target.value)}/>
                                  {formik.errors.email && formik.touched.email ?
                                      <div className="text-sm text-danger">{formik.errors.email}</div>:null
                                  }
                              </div>
                              <div className="form-group">
                                  <label className="font-semibold">Password</label>
                                  <input type="password" className="form-control form-swantik" placeholder="Masukkan password" value={formik.values.password} onChange={(e)=>formik.setFieldValue('password', e.target.value)}/>
                                  {formik.errors.password && formik.touched.password ?
                                      <div className="text-sm text-danger">{formik.errors.password}</div>:null
                                  }
                              </div>
                              {status && <Alert severity={severity}>{message}</Alert>}
                              <br/>
                              <center><Button variant="contained" color="primary" type="submit">Masuk</Button></center>
                          </form>
                          <br/>
                          <center>
                              Belum punya akun? <Link href="/register"><a className="link">Daftar disini</a></Link>
                          </center>  
                      </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
        </div>
    )
}
export default Index;
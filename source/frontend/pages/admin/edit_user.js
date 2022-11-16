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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {dateDefault} from '../../utils/helpers';
import { first } from 'lodash';
const EditUser = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [users, setUsers] = useState({});
    const [status, setStatus] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [business, setBusiness] = useState([]);
    const [residence, setResidence] = useState([]);
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
    useEffect(()=>{
        getBusiness();
        getResidence();
    },[])
    const id = router.query.id;
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
        getUser();
    },[])
    const schema = Yup.object().shape({
        name: Yup.string().required('Nama perangkat desa wajib diisi'),
        alamat: Yup.string().required('Alamat wajib diisi'),
        phone: Yup.string().required('Nomor HP wajib diisi'),
        dateOfBirth: Yup.string().required('Tanggal lahir wajib diisi'),
        businessId: Yup.string().required('Divisi wajib diisi'),
        role: Yup.string().required('Role wajib dipilih'),
        residenceId: Yup.string().required('Residence wajib diisi'),
    });
    const initialValues = {
        name: '',
        alamat:'',
        phone: '',
        businessId:'',
        role:'',
        dateOfBirth: new Date(),
        residenceId:'',
    };
    useEffect(()=>{
        formik.setFieldValue('name', first(users)?.userInfo?.name || '')
        formik.setFieldValue('alamat', first(users)?.userInfo?.address || '')
        formik.setFieldValue('phone', first(users)?.userInfo?.hp || '')
        formik.setFieldValue('businessId', first(users)?.userInfo?.businessUnitId || '')
        formik.setFieldValue('role', first(users)?.userInfo?.roleId || '')
        formik.setFieldValue('residenceId', first(users)?.userInfo?.residenceId || '')
    },[users])

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://103.176.78.92:8080/management-user/edit/user`;
            const data = {
                userInfo: {
                    address: values.alamat,
                    birthDate: dateDefault(values.dateOfBirth),
                    businessUnitId: Number(values.businessId),
                    email: first(users)?.userInfo?.email,
                    hp: values.phone,
                    name: values.name,
                    residenceId: Number(values.residenceId),
                    roleId: values.role,
                },
                username: first(users)?.userInfo?.email
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
                    setMessage('Berhasil Edit User')
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
            <Head title="Edit User - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <div className="heading-2">Edit User</div>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Role<span className="text-danger">*</span></label>
                                        <select className="form-control form-swantik" value={formik.values.role || ''} onChange={(e) => formik.setFieldValue('role', e.target.value)}>
                                            <option value="">--Pilih Role--</option>
                                            <option value={1}>Admin</option>
                                            <option value={2}>Perangkat Desa</option>
                                            <option value={3}>Warga</option>
                                        </select>
                                        {formik.errors.role && formik.touched.role ?
                                            <div className="text-danger text-sm ">{formik.errors.role}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Nama<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan nama" value={formik.values.name || ''} onChange={(e) => formik.setFieldValue('name', e.target.value)}/>
                                        {formik.errors.name && formik.touched.name ?
                                            <div className="text-danger text-sm ">{formik.errors.name}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Alamat<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan alamat" value={formik.values.alamat || ''} onChange={(e) => formik.setFieldValue('alamat', e.target.value)}/>
                                        {formik.errors.alamat && formik.touched.alamat ?
                                            <div className="text-danger text-sm ">{formik.errors.alamat}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Nomor HP<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan nomor HP" value={formik.values.phone || ''} onChange={(e) => formik.setFieldValue('phone', e.target.value)}/>
                                        {formik.errors.phone && formik.touched.phone ?
                                            <div className="text-danger text-sm ">{formik.errors.phone}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <div className="form-group">
                                        <label className="font-semibold">Tanggal Lahir</label>
                                        <DatePicker
                                            selected={formik.values.dateOfBirth || ''}
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
                                </Grid>
                                {formik.values.role == 2 &&
                                    <Grid item md={6} sm={6} xs={12}>
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
                                }
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
export default EditUser;
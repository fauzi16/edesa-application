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

const EditUser = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [users, setUsers] = useState({});
    const [status, setStatus] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    console.log(router)
    const id = router.query.id;
    const getUser = () => {
        const url = `http://103.176.78.92:8080/users/${id}`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setUsers(resp.data)
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
        businessUnit: Yup.string()
        .when('role', {
          is: '2',
          then: Yup.string()
            .required('Divisi wajib diisi'),
        }),
        role: Yup.string().required('Role wajib dipilih'),
    });
    const initialValues = {
        name: '',
        alamat:'',
        phone: '',
        businessUnit:'',
        role:'',
        dateOfBirth: new Date(),
    };
    useEffect(()=>{
        formik.setFieldValue('name', users?.userInfo?.name)
        formik.setFieldValue('alamat', users?.userInfo?.address)
        formik.setFieldValue('phone', users?.userInfo?.hp)
        formik.setFieldValue('businessUnit', users?.userInfo?.businessUnit || '')
        formik.setFieldValue('role', users?.roleId)
    },[users])
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://103.176.78.92:8080/management-user/edit/user`;
            const data = {
                address: values.alamat,
                businessUnitId: values.businessUnit,
                email: values.email,
                hp: values.phone,
                name: values.name,
                birthDate: dateDefault(values.dateOfBirth),
                id: id,
                roleId: values.role,
                registrationInfoId: 0,
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
    console.log({formik})
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
                                {formik.values.role === '2' &&
                                    <Grid item md={6} sm={6} xs={12}>
                                        <div className="form-group m-t-10">
                                            <label className="font-bold">Divisi<span className="text-danger">*</span></label>
                                            <select className="form-control form-swantik" value={formik.values.businessUnit || ''} onChange={(e) => formik.setFieldValue('businessUnit', e.target.value)}>
                                                <option value="1">Unit Kesejahteraan dan Pelayanan</option>
                                                <option value="2">Unit Keamanan dan ketertiban</option>
                                                <option value="3">Unit Pemerintahan</option>
                                                <option value="4">Dusun</option>
                                            </select>
                                            {formik.errors.businessUnit && formik.touched.businessUnit ?
                                                <div className="text-danger text-sm ">{formik.errors.businessUnit}</div> : null
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
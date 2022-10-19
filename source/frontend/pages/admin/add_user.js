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
    const [merchantId, setMerchantId] = useState('');
    const schema = Yup.object().shape({
        name: Yup.string().required('Nama Konsultan wajib diisi'),
        position: Yup.string().required('Posisi wajib diisi'),
        phone: Yup.string().required('Nomor HP wajib diisi'),
    });
    const initialValues = {
        name:'',
        position:'',
        phone: '',
    };
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://168.138.181.227:8080/adminMarketplaces`;
            const data = {
                divisionId: 0,
                id: 0,
                name: values.name,
                phoneNumber: values.phone,
                position: values.position,
                status: true,
                userId: 0
            }
            const head = {
                headers: {
                    'Authorization': `Bearer ${cookie.get(TOKEN)}`
                }
            }
            axios.post(url, data, head)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(response)
                } else {   
                    router.push("/admin/user")
                }
            })
            .catch(function (error) {
                console.log(error)
            });
        },
    });
    return(
        <Fragment>
            <Head title="Tambah User - Swantik"/>
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
                                        <label className="font-bold">Posisi<span className="text-danger">*</span></label>
                                        <input className="form-control form-swantik" placeholder="Masukkan deskripsi/posisi/jabatan" value={formik.values.position} onChange={(e) => formik.setFieldValue('position', e.target.value)}/>
                                        {formik.errors.position && formik.touched.position ?
                                            <div className="text-danger text-sm ">{formik.errors.position}</div> : null
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
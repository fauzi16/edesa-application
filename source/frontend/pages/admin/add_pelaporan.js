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
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCad6Maqp-rBaiOP5rimmtrV4tkapJCppA");
Geocode.enableDebug();
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.defaultCenter}
    center={props.defaultCenter}
  >
    <Marker position={props.defaultCenter} />
  </GoogleMap>
))
const loadingElementStyle = { height: "100%" };
const containerElementStyle = { height: "208px" };
const mapElementStyle = { height: "100%" };

const AddPelaporan = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [status, setStatus] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [mapPosition, setMapPosition] = useState({
        lat: -6.586987,
        lng: 106.7994842
    })
    const [markerPosition, setMarkerPosition] = useState({
        lat: -6.586987,
        lng: 106.7994842
    })
    const schema = Yup.object().shape({
        address: Yup.string().required('Alamat lokasi wajib diisi'),
        description: Yup.string().required('Deskripsi wajib diisi'),
    });
    const initialValues = {
        coordinate: "",
        description: "",
        lat: '',
        lng: '',
        name: '',
        address: '',
        city:'',
    };
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
            setId(response.data)
        })
        .catch(function (error) {
            console.log(error)
        });
    },[user?.user?.email])
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://103.176.78.92:8080/issue/step1-buat-laporan-oleh-warga`;
            const data = {
                coordinate:`${values.lat},${values.lng}`,
                description: values.description,
                reporterId: id.id
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
                    setMessage('Berhasil menambah pelaporan')
                    setTimeout(() => {        
                        router.push("/admin/pelaporan_warga")
                    }, 200);
                }
            })
            .catch(function (error) {
                console.log(error)
            });
        },
    });

    const getLatLang = (text) => {
        Geocode.fromAddress(text).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              formik.setFieldValue('lat', lat)
              formik.setFieldValue('lng', lng)
              setMapPosition({
                lat: lat,
                lng: lng
                })
            setMarkerPosition({
                lat: lat,
                lng: lng
            })
            },
            (error) => {
              console.error(error);
            }
        );
    }

    return(
        <Fragment>
            <Head title="Tambah Pengaduan - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <div className="heading-2">Tambah Pengaduan</div>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Deskripsi Pengaduan<span className="text-danger">*</span></label>
                                        <textarea name="textarea" className="form-control form-swantik" rows="4" value={formik.values.description} onChange={(e)=> formik.setFieldValue('description', e.target.value)}></textarea>
                                        {formik.errors.description && formik.touched.description ?
                                            <div className="text-danger text-sm ">{formik.errors.description}</div> : null
                                        }
                                    </div>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <div className="form-group m-t-10">
                                        <label className="font-bold">Koordinat<span className="text-danger">*</span></label>
                                        <input 
                                            type="text" 
                                            placeholder="Tuliskan nama lokasi" 
                                            className="form-control form-swantik" 
                                            value={formik.values.name} 
                                            onChange={(e)=>{
                                                formik.setFieldValue('name',e.target.value)
                                                getLatLang(formik.values.name + " " +formik.values.address + " " + formik.values.city)
                                            }}
                                        />
                                        {formik.errors.name && formik.touched.name ? <div className="text-danger text-sm">{formik.errors.name}</div>:null}
                                        <br/>
                                        <input 
                                            type="text" 
                                            placeholder="Tuliskan alamat lokasi" 
                                            className="form-control form-swantik" 
                                            value={formik.values.address} 
                                            onChange={(e)=>{
                                                formik.setFieldValue('address',e.target.value)
                                                getLatLang(formik.values.name + " " +formik.values.address + " " + formik.values.city)
                                            }}
                                        />
                                        {formik.errors.address && formik.touched.address ? <div className="text-danger text-sm">{formik.errors.address}</div>:null}
                                        <br/>
                                        <input 
                                            type="text" 
                                            placeholder="Tuliskan kota" 
                                            className="form-control form-ipb" 
                                            value={formik.values.city} 
                                            onChange={(e)=>{
                                                formik.setFieldValue('city',e.target.value)
                                                getLatLang(formik.values.name + " " +formik.values.address + " " + formik.values.city)
                                            }}
                                        />
                                        {formik.errors.city && formik.touched.city ? <div className="text-danger text-sm">{formik.errors.city}</div>:null}
                                        <br/>
                                        <MyMapComponent
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCad6Maqp-rBaiOP5rimmtrV4tkapJCppA"
                                            loadingElement={<div style={loadingElementStyle} />}
                                            containerElement={<div style={containerElementStyle} />}
                                            mapElement={<div style={mapElementStyle} />}
                                            defaultCenter={{
                                                lat: formik.values.lat,
                                                lng: formik.values.lng,
                                            }}
                                        />
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
export default AddPelaporan;
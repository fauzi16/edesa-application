import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Grid, Button, Modal, Paper} from '@mui/material';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import Link from 'next/link';
import axios from 'axios';
import UserContext from '../../utils/UserContext';
import { cookie } from '../../utils/global';
import { TOKEN } from '../../utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router'
import DataTable from 'react-data-table-component';
import {orderBy} from 'lodash';
import {dateTimeFormat} from '../../utils/helpers';
import * as Yup from 'yup';
import {useFormik} from 'formik';
const PelaporanPerangkat = () => {
    const [issues, setIssues] = useState([]);
    const router = useRouter();
    const user = useContext(UserContext)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [id, setId] = useState('');
    const [open, setOpen] = useState(false);
    const [openPenugasan, setOpenPenugasan] = useState(false);
    const [idIssue, setIdIssue] = useState('');
    const [pengaduan, setPengaduan] = useState({});
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

    const getIssues = () => {
        const url = `http://103.176.78.92:8080/issues/find-alldata-by-sample`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        const data_perangkat = {
            assignee: id.id,
        }
        axios.post(url,data_perangkat, head)
        .then(resp => {
            setIssues(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }


    useEffect(()=>{
        if(id){
            getIssues();
        }
    },[id])

    const columns = [
        {
            name:'Koordinat',
            sortable:true,
            selector: 'coordinate',
        },
        {
            name:'Deskripsi',
            sortable:true,
            selector: 'description',
        },
        {
            name:'Status',
            sortable:true,
            selector: 'status',
        },
        {
            name: 'Aksi',
            sortable: false,
            width: '100px',
            cell: (row,index) => {return <div key={index}>
                <a 
                    onClick={()=>{
                        setOpen(true)
                        setPengaduan(row)
                    }}
                >
                    <VisibilityIcon/>
                </a>
                {row.status !== 'CLOSED' && 
                    <a 
                        onClick={()=>{
                            setOpenPenugasan(true);
                            setIdIssue(row.id)
                        }}
                    >
                        <EditIcon/>
                    </a>
                }
            </div>
            },
        },
    ];
    const customSort = (rows, field, direction) => {
        const handleField = row => {
            if (row[field]) {
                return row[field].toLowerCase();
            }
            return row[field];
        }
        return orderBy(rows, handleField, direction);
    }
    const customStyles2 = {
        header:{
            style:{
                display:'none'
            }
        },
        headCells: {
            style: {
                fontWeight:'600',
                fontSize:'14px',
                minWidth:'100px'
            },
        },
        cells: {
            style: {
              wordBreak: 'break-word',
              fontSize:'14px',
              paddingTop:'5px',
              paddingBottom:'5px'
            },
        },
        subHeader: {
            style: {
              minWidth: '100px',
            },
        },
    };
    const schema = Yup.object().shape({});
    const initialValues = {
        comment: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values, action) => {
            const url = `http://103.176.78.92:8080/issue/step3-inprogress-laporan-oleh-petugas-desa`;
            const urlComment = `http://103.176.78.92:8080/issue/add-comment`;
            const data ={
                issueId: Number(idIssue),
            }
            const dataComment ={
                comment: values.comment,
                commentBy: Number(id.id),
                issueId: Number(idIssue)
            }
            const head = {
                headers: {
                    'Authorization': `Bearer ${cookie.get(TOKEN)}`
                }
            }
            axios.post(url, data, head)
            .then(function (response) {
                if (response.status === 200) {
                    if(values.comment !== ''){
                        axios.post(urlComment, dataComment, head)
                        .then(function (response) {
                            if (response.status !== 200) {
                                setOpenPenugasan(false);  
                            } else {
                                setTimeout(() => {        
                                    window.open("/admin/pelaporan_perangkat","_self")
                                }, 200);
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                    } else{
                        setTimeout(() => {  
                            window.open("/admin/pelaporan_perangkat","_self")
                        }, 200);
                    }
                    
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        },
    });
    return(
        <Fragment>
            <Head title="Manajamen Pengaduan - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className="heading-2">PENGADUAN</div>
                            </Grid>
                        </Grid>   
                        <br/>
                        <div style={{ height: 600, width: '100%' }}>
                            <DataTable
                                data={issues}
                                columns={columns}
                                pagination
                                paginationResetDefaultPage={resetPaginationToggle}
                                sortFunction={customSort}
                                customStyles={customStyles2}
                            />
                        </div>
                        
                    </div>
                    <Footer/>
                    <Modal
                        open={open}
                        onClose={()=> setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Paper sx={style}>
                            <h3>Detail Pengaduan</h3>
                            <hr/>
                            <table>
                                <tbody>
                                    <tr>
                                        <td width={100}>Deskripsi</td>
                                        <td width={20}>:</td>
                                        <td>{pengaduan?.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Waktu dibuat</td>
                                        <td>:</td>
                                        <td>{dateTimeFormat(pengaduan?.createdTime)}</td>
                                    </tr>
                                    <tr>
                                        <td>Diassign ke</td>
                                        <td>:</td>
                                        <td>{pengaduan?.assigneeInfo !== null ? pengaduan?.assigneeInfo?.userInfo?.name : '-'}</td>
                                    </tr>
                                    <tr>
                                        <td valign='top'>History</td>
                                        <td valign='top'>:</td>
                                        <td>
                                            {pengaduan?.issueUpdates?.map((data,i)=>
                                                <div key={i}>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Status terbaru</td>
                                                                <td>:</td>
                                                                <td><b>{data.transition ? data.transition : data.status}</b></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Waktu Update</td>
                                                                <td>:</td>
                                                                <td>{dateTimeFormat(data.updateTime)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Komentar</td>
                                                                <td>:</td>
                                                                <td>{data.comment}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <hr/>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Paper>
                    </Modal>
                    <Modal
                        open={openPenugasan}
                        onClose={()=> setOpenPenugasan(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Paper sx={style}>
                            <h3>Ubah Status Pengaduan</h3>
                            <hr/>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group m-t-10">
                                    <label className="font-bold">Beri Komentar (jika ada)</label>
                                    <textarea name="textarea" className="form-control form-swantik" rows="4" value={formik.values.comment} onChange={(e)=> formik.setFieldValue('comment', e.target.value)}></textarea>
                                </div>    
                                <br/>
                                <Button variant="contained" color="primary" type="submit">Simpan</Button>           
                            </form>
                        </Paper>
                    </Modal>
                </div>
            </div>
        </Fragment>
    )
}
export default PelaporanPerangkat;
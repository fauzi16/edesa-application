import React, {Fragment, useState, useEffect,useContext} from 'react';
import { string } from 'prop-types';
import {useRouter} from 'next/router';
import Link from "next/link";
import UserContext from '../../utils/UserContext';
import Image from 'next/image';
import {Button, Chip} from '@mui/material';
import { cookie } from '../../utils/global';
import { TOKEN } from '../../utils/constant';
import axios from 'axios';

const Navbar = (props) => {
    const [keyword, setKeyword] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const user = useContext(UserContext);
    const [category, setCategory] = useState('Treatment Kecantikan');
    const [isCollapse, setIsCollapse] = useState(false);
    const [show, setShow] = useState(false);
    const [basketList, setBasketList] = useState([]);
    const router = useRouter();
    const showMenu = (e) => {
        e.preventDefault();
        setShowSearch(!showSearch)
    }
    const  _handleKeyDown = (e) => {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            router.push(`/products?keyword=${keyword}&type=${category == 'Treatment Kecantikan' ? 2:1}`)
        }
    }

    const getBasketDetail = () => {
        const url = `http://168.138.181.227:8080/basketDetails`;
        axios.get(url, {
            method: 'GET',
            mode: 'cors',
            headers: {'Authorization': `Bearer ${cookie.get(TOKEN)}`},
        })
        .then(resp => {
            let list=[];
            resp.data.map((d) => 
                list.push({...d, checked: false})
            )
            setBasketList(list)
        }).catch(err => {
            console.log('err', err)
        });   
    }
    useEffect(() => {
        getBasketDetail();
    },[])
    return(
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link href="/">
                        <a className="navbar-brand text-primary">
                            <h3>SIPENGADU</h3>
                        </a>
                    </Link>
                    <div className="navbar-nav me-auto mb-2 mb-lg-0 m-l-20">
                    </div>
                    {cookie.get(TOKEN) && (
                        <div className=" d-flex">
                            <a className="dropdown-toggle menus" data-toggle="dropdown" onClick={() => setShow(!show)}>
                                <div className="d-flex align-items-center">
                                    <img src="../default.png" className="profile-photo" alt="profil"/>
                                    <span>Hi, {user.user?.email}</span>
                                </div>
                            </a>
                            <div className={`dropdown-menu dropdown-navbar dropdown-login-menu ${show ? 'show' : ''}`}>
                                {user?.user?.roleId == 1 &&
                                    <Link href="/profile">
                                        <a className="dropdown-item" >Profil</a>
                                    </Link>
                                }
                                <a className="dropdown-item" onClick={user.logout}>Keluar</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
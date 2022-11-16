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
    const user = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		return null;
	}
    return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link href="/">
                            <a className="navbar-brand text-primary">
                                <h3>E-DESA</h3>
                            </a>
                        </Link>
                        <div className="navbar-nav me-auto mb-2 mb-lg-0 m-l-20">
                        </div>
                        {cookie.get(TOKEN) && (
                            <div className=" d-flex">
                                <a className="dropdown-toggle menus" data-toggle="dropdown" onClick={() => setShow(!show)}>
                                    <div className="d-flex align-items-center">
                                        <span>Hi, {user.user?.email}</span>
                                    </div>
                                </a>
                                <div className={`dropdown-menu dropdown-navbar dropdown-login-menu ${show ? 'show' : ''}`}>
                                    <a className="dropdown-item" onClick={user.logout}>Keluar</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}
export default Navbar;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const [nameTarget, setNameTarget] = useState('');
    const navigate = useNavigate();

    const headingToIphones = () => {
        navigate('/list/iphone')
    }
    const headingToMacbook = () => {
        navigate('/list/macbook')
    }
    const headingToIpad = () => {
        navigate('/list/ipad')
    }
    const headingToWatch = () => {
        navigate('/list/watch')
    }
    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/list/${nameTarget}`);
        }
    }
    const handleSearch = () => {
        navigate(`/list/${nameTarget}`);
    }
    const handleListenInput = (event) => {
        setNameTarget(event.target.value);
    }

    return (
        <>
            <header className='toper'>
                <div className="header">
                    <div>
                        <a href="/home"
                        ><img src="/images/logoplus.png" alt="topzone" className="logo"
                            /></a>
                    </div>
                    <ul className="menu-on-header">
                        <li className="menu-iphone">
                            <a className="link" onClick={headingToIphones}><span>IPhone</span></a>
                        </li>
                        <li className="menu-mac">
                            <a className="link" onClick={headingToMacbook}><span>Macbook</span></a>
                        </li>
                        <li className="menu-sound">
                            <a className="link" onClick={headingToIpad}><span>IPad</span></a>
                        </li>
                        <li className="menu-ipad">
                            <a className="link" onClick={headingToWatch}><span>Watch</span></a>
                        </li>
                    </ul>
                    <div className="search-login">
                        <input value={nameTarget} onKeyDown={handleOnKeyDown} onChange={handleListenInput} type="text" className="search-bar" placeholder="Tìm kiếm" id='search-name' />
                        <div className="header-search" onClick={handleSearch}>
                            <i className="search-icon bx bx-search-alt-2" ></i>
                        </div>

                    </div>
                </div>
            </header >
        </>
    );
};

export default Header;
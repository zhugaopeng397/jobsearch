import styles from './topbar.module.css';
import React, { useState, useEffect } from 'react';
import styless from './searchbar.module.css';
import stylesr from './searchedresult.module.css'
import Head from 'next/head';
import Link from 'next/link';

export default function Topbar() {

    useEffect(()=>{
        const wrapper = document.querySelector("#wrapper");
        const header = document.querySelector("#header");
        wrapper.addEventListener("scroll", (e) => {
            e.target.scrollTop > 30
                ? header.classList.add(styles.headershadow)
                : header.classList.remove(styles.headershadow);
        });

        const toggleButton = document.querySelector(`.${styles.darklight}`);
        toggleButton.addEventListener("click", () => {
            document.body.classList.toggle(styles.darkmode);
        });
        }, []);
    
    const [currAddress, setCurrAddress] = useState('0x');

    let userAddr = '';


    //currAddress的值是在组件渲染后才有值的。在 React 中，当您在组件渲染时使用 {currAddress}的值时，React 会将 {currAddress}的值替换为当前状态的值。
    //在组件渲染后使用 useEffect钩子来打印 {currAddress}的值
    // useEffect(()=>{
    //     console.log("currAddress==",currAddress);
    // }, [currAddress])

    const { keccak256 } = require("ethereum-cryptography/keccak");
    const { utf8ToBytes } = require("ethereum-cryptography/utils");

    function hashMessage(message) {
        const bytes = utf8ToBytes("\x19Ethereum Signed Message:\n" + message);
        const hash = keccak256(bytes);
        return hash; 
    }

    async function handleLogon() {
        const chainId = await window.ethereum.request({method: 'eth_chainId'});
        if (chainId !== '0x5') {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }],
            })
        }
        //获取登陆地址
        //eth_requestAccounts 内置了 wallet_requestPermissions call,
        //但这里选择call wallet_requestPermissions，可以每次弹窗，让用户选择钱包。
        //当然用户在浏览器切换钱包地址，也可以反映到网站上。
        const accounts = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        }).then(() => ethereum.request({
            method: 'eth_requestAccounts'
            }).then(() => {
                const logo = document.querySelector(`.${styles.logon}`);
                logo.classList.add(styles.logoconnected);
                const logged = document.querySelector(`.${styles.logged}`);
                logged.classList.add(styles.loggedconnected);
            })
            .catch((error) => {
                if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(error);
                }
            })
        );
            
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        await signer.getAddress().then((addr) => {
            setCurrAddress(addr);
            userAddr = addr;
        });
        //签名消息
        const message = 'The address is currently logging on the website.';
        const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
        console.log("msg===",msg);
        await window.ethereum.request({
            method: 'personal_sign',
            params: [msg, userAddr],
        }).catch((error) => {
            if (error.code === -32603) {
                console.log('User denied message signature.');
            } else {
                console.error(error);
            }
        });
    }

    const [showPopup, setShowPopup] = useState(false);

    const handleLogged = () => {
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const handleLogout = async () => {
        const logo = document.querySelector(`.${styles.logon}`);
        logo.classList.remove(styles.logoconnected);
        const logged = document.querySelector(`.${styles.logged}`);
        logged.classList.remove(styles.loggedconnected);
        setShowPopup(false);
    }

    return (
    <div id="header" className={styles.header}>
        <style>{`
            .${styles.darkmode} .${styles.darklight} svg {
                fill: #ffce45;
                stroke: #ffce45;
            }
            .${styles.darkmode} .${stylesr.jobcard} svg {
                box-shadow: none;
            }
            .${styles.darkmode} .${styless.searchitem} {
                color: var(--body-color);
                border-color: var(--body-color) !important;
            }
            .${styles.darkmode} .${styless.searchlocation} svg,
            .${styles.darkmode} .${styless.searchjob} svg,
            .${styles.darkmode} .${styless.searchsalary} svg {
                color: var(--body-color);
            }
            .${styles.darkmode} .${stylesr.detailbutton} {
                background-color: var(--inactive-color);
                color: var(--subtitle-color);
            }

        `}</style>

        <div className={styles.logo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path xmlns="http://www.w3.org/2000/svg" d="M512 503.5H381.7a48 48 0 01-45.3-32.1L265 268.1l-9-25.5 2.7-124.6L338.2 8.5l23.5 67.1L512 503.5z" fill="#0473ff" data-original="#28b446" />
                <path xmlns="http://www.w3.org/2000/svg" fill="#0473ff" data-original="#219b38" d="M361.7 75.6L265 268.1l-9-25.5 2.7-124.6L338.2 8.5z" />
                <path xmlns="http://www.w3.org/2000/svg" d="M338.2 8.5l-82.2 234-80.4 228.9a48 48 0 01-45.3 32.1H0l173.8-495h164.4z" fill="#0473ff" data-original="#518ef8" />
            </svg>
            设备租赁DAPP
        </div>
        <div className={styles.headermenu}>
            <Link href="/" className="active">设备专区</Link>
            <Link href={{pathname:'/listnft',
                         query:{currAddress:currAddress}
                        }}>上架设备</Link>
            <Link href={{pathname:'/mynft',
                         query:{currAddress:currAddress}
                        }}>我的账户</Link>
        </div>

        <div className={styles.usersettings}>
            <div className={styles.darklight}>
                <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            </div>
            <div className={styles.usermenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                </svg>
            </div>
            {/* <img className={styles.userprofile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
            <div className={styles.username}>Suhayel Nasim</div> */}
            <div className={styles.logon} onClick={() => handleLogon()}>连接钱包</div>
            <div className={styles.logged} onClick={handleLogged}></div>
            {showPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h4>Address: {currAddress}</h4>
                        <button className={styles.closeButton} onClick={handleLogout}>
                            Logout
                        </button>
                        <button className={styles.closeButton} onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>               
                </div>
            )}
        </div>
    </div>
    ); 
}
import styles from './topbar.module.css';
import React, { useState, useEffect } from 'react';
import styless from './searchbar.module.css';
import stylesr from './searchedresult.module.css'

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
            Milao
        </div>
        <div className={styles.headermenu}>
            <a href="#" className="active">Find Job</a>
            <a href="#">Company Review</a>
            <a href="#">Find Salaries</a>
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
            <img className={styles.userprofile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
            <div className={styles.username}>Suhayel Nasim</div>
        </div>
    </div>
    );
}
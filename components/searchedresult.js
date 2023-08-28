import { useEffect, useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

import styles from './searchedresult.module.css'
import stylest from './topbar.module.css';
import Router from 'next/router';

export default function Searchedresult() {
    const [jobs, setJobs] = useState(null);
    const [dataFetched, updateFetched] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobDesc, setJobDesc] = useState(null);
    const [data, updateData] = useState([]);
    const { push } = useRouter();

    useEffect(()=>{
        // fetch('http://localhost:3000/jobs').
        //     then((res) => res.json()).then((res) => {
        //         setJobs(res.data);
        // });
        
        const wrapper = document.querySelector("#wrapper");

        const jobCards = document.querySelectorAll(`.${styles.jobcard}`);
    
        const logo = document.querySelector(`.${stylest.logo}`);
        const jobLogos = document.querySelector(`.${styles.joblogos}`);
        const jobDetailTitle = document.querySelector(
            `.${styles.jobexplaincontent} .${styles.jobcardtitle}`
        );
        const jobBg = document.querySelector(`.${styles.jobbg}`);

        logo.addEventListener("click", () => {
            wrapper.classList.remove(styles.detailpage);
            wrapper.scrollTop = 0;
        });
    },[]);

    function diffDay (postDate) {
        const currentDate = new Date();
        const targetDate = new Date(postDate);
        const diffTime = currentDate.getTime() - targetDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays+'D';
    }

    async function getAllNFTsWithAPI() {
        const nfts = await fetch('http://localhost:3000/getAllNfts').
            then((res) => res.json()).then((res) => {
                // setJobs(res.data);
                // console.log("all nfts==", res);

                return res.nfts.map(i => {
                    let item = {
                        tokenId: i.tokenId,
                        // seller: seller,
                        // owner: nftOwner,
                        price: i.raw.metadata.price,
                        image: i.raw.metadata.image,
                        name: i.raw.metadata.name,
                        description: i.raw.metadata.description
                    }
                    return item;
                })
            });

        console.log("all nfts==", nfts);

        setJobs(nfts);
        updateFetched(true);
    }

    async function handleJobClick(job) {
        
        const number = Math.floor(Math.random() * 10);
        const url = `https://unsplash.it/640/425?image=${number}&${Math.random()*1000}`;
        job.src = url;
        const wrapper = document.querySelector("#wrapper");
        wrapper.classList.add(styles.detailpage);
        wrapper.scrollTop = 0;
        setSelectedJob(job);
        // await (fetch(`http://localhost:3000/job?jobid=${job.jobid}`).
        //     then((res) => res.json()).then((res) => {
        //         setJobDesc(res.data);
        //         setSelectedJob(job);
                
        // }))
    }

    async function handleJobApply(job) {
        const userAddress = '0x9915540CDb0d3692B0BE06017b0f92C52C491857';
        await (fetch(`http://localhost:3000/nft?jobid=${job.jobid}&useraddress=${userAddress}`).
            then((res) => res.json()).then((res) => {
                if (res.result) {
                    console.log('nft minted!');
                }
        }))
    }

    async function buyNFT(job) {
        console.log("jobid="+job.tokenId);
        // push(`/buynft?tokenId=${job.tokenId}`);

        Router.push({
            pathname: '/buynft',
            query: { tokenId: job.tokenId },
          })

    }

    async function handleJobMessage(job) {
        const from = '0x9915540cdb0d3692b0be06017b0f92c52c491857';
        const to = '0x2914dfc8A156C79C61a9877dCc9aD0893B90Ba8C';
        await (fetch(`http://localhost:3000/nft/transfer?jobid=${job.jobid}&from=${from}&to=${to}`).
            then((res) => res.json()).then((res) => {
                if (res.result) {
                    console.log('nft transferred!');
                }
        }))
    }

    async function updateNft(job) {
        console.log("jobid="+job.tokenId);

        Router.push({
            pathname: '/updatenft',
            query: { tokenId: job.tokenId },
          })
    }

    if(!dataFetched) {
        getAllNFTsWithAPI();
    }
    return (
        <div className={styles.searchedjobs}>
            <div className={styles.searchedbar}>
                <div className={styles.searchedshow}>Showing 23 NFTs</div>
                <div className={styles.searchedsort}>Sort by: <span className={styles.posttime}>最近上架 </span><span className={styles.menuicon}>▼</span></div>
            </div>
            <div className={styles.jobcards}>
                {jobs && jobs.map((job) => (
                    <div className={styles.jobcard} >
                        <div className={styles.jobcardheader} onClick={() => handleJobClick(job)}> 
                            <img src={job.image} alt="NFT Image" />
                            <div className={styles.menudot}></div>
                        </div>
                        <div className={styles.jobcardtitle}>{job.name}</div>
                        <div className={styles.jobcardsubtitle}>
                            {job.price} ETH
                        </div>
                        <div className={styles.jobdetailbuttons}>
                            <button className={`${styles.searchbuttons} ${styles.detailbutton}`}>{job.description}</button>
                            <button className={`${styles.searchbuttons} ${styles.detailbutton}`}>{job.description}</button>
                            <button className={`${styles.searchbuttons} ${styles.detailbutton}`}>{job.description}</button>
                        </div>
                        <div className={styles.jobcardbuttons}>
                            <button className={`${styles.searchbuttons} ${styles.cardbuttons}`} onClick={() => buyNFT(job)}>我要购买</button>
                            <button className={`${styles.searchbuttons} ${styles.cardbuttonsmsg}`} onClick={() => updateNft(job)}>设备详情</button>
                        </div>
                    </div>
                ))}
            </div> 

            <div className={styles.joboverview}>
                <div className={styles.joboverviewcards}>
                {jobs && jobs.map((job) => (
                    <div className={styles.joboverviewcard} onClick={() => handleJobClick(job)}>
                        <div className={`${styles.jobcard} ${styles.overviewcard}`}>
                            <div className={styles.overviewwrapper}>
                                <img src={job.image} alt="NFT Image" />
                                <div className={styles.overviewdetail}>
                                    <div className={styles.jobcardtitle}>{job.name}</div>
                                    <div className={styles.jobcardsubtitle}>
                                        {job.price} ETH
                                    </div>
                                </div>
                                <svg className={styles.heart} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                                    <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                                </svg>
                            </div>
                            <div className={styles.joboverviewbuttons}>
                                <div className={`${styles.searchbuttons} ${styles.timebutton}`}>{job.name}</div>
                                <div className={`${styles.searchbuttons} ${styles.levelbutton}`}>{job.name}</div>
                                <div className={styles.jobstat}>{job.description}</div>
                                {/* <div className={styles.jobday}>{diffDay(job.postdate)}</div> */}
                            </div>
                        </div>
                    </div>
                ))}
                </div>    

                {/* 详情开始     */}
                {selectedJob && (
                <div className={styles.jobexplain}>
                    <img className={styles.jobbg} src={selectedJob.src} />
                    <div className={styles.joblogos}>
                        <img src={selectedJob.image} alt="NFT Image" />
                    </div>
                    <div className={styles.jobexplaincontent}>
                        <div className={styles.jobtitlewrapper}>
                            <div className={styles.jobcardtitle}>{selectedJob.jobtitle}</div>
                            <div className={styles.jobaction}>
                                <svg className={styles.heart} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
                                    <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>
                                </svg>
                            </div>
                        </div>
                        <div className={styles.jobsubtitlewrapper}>
                            <div className={styles.companyname}>{selectedJob.companyname} <span className={styles.complocation}>{selectedJob.companylocation}</span></div>
                            <div className={styles.posted}>Posted {diffDay(selectedJob.postdate)} days ago<span className={styles.appnumber}>{selectedJob.appnum} Application</span></div>
                        </div>
                        <div className={styles.explainbar}>
                            <div className={styles.explaincontents}>
                                <div className={styles.explaintitle}>Experience</div>
                                <div className={styles.explainsubtitle}>{selectedJob.experience}</div>
                            </div>
                            <div className={styles.explaincontents}>
                                <div className={styles.explaintitle}>Work Level</div>
                                <div className={styles.explainsubtitle}>{selectedJob.worklevel}</div>
                            </div>
                            <div className={styles.explaincontents}>
                                <div className={styles.explaintitle}>Employee Type</div>
                                <div className={styles.explainsubtitle}>{selectedJob.employeetype}</div>
                            </div>
                            <div className={styles.explaincontents}>
                                <div className={styles.explaintitle}>Offer Salary</div>
                                <div className={styles.explainsubtitle}>{selectedJob.offersalary}</div>
                            </div>
                        </div>
                        <div className={styles.overviewtext}>
                            <div className={styles.overviewtextheader}>Overview</div>
                            <div className={styles.overviewtextsubheader}>{selectedJob.overview}</div>
                        </div>
                        <div className={styles.overviewtext}>
                            <div className={styles.overviewtextheader}>Job Description</div>
                            {jobDesc && (jobDesc.map((j)=>(
                                     <div className={styles.overviewtextitem}>${j.description}</div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                )}

            </div>
        </div>
    );
}

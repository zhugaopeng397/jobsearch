import styles from './sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={styles.searchtype}>
            <div className={styles.alert}>
                <div className={styles.alerttitle}>Create Job Alert</div>
                <div className={styles.alertsubtitle}>Create a job alert now and never miss a job</div>
                <input type="text" placeholder="Enter job keyword" />
                <button className={styles.searchbuttons}>Create Job Alerts</button>
            </div>
            <div className={styles.jobtime}>
                <div className={styles.jobtimetitle}>Type of Employment</div>
                <div className={styles.jobwrapper}>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job1" className={styles.jobstyle} />
                        <label for="job1">Full Time Jobs</label>
                        <span className={styles.jobnumber}>56</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job2" className={styles.jobstyle} />
                        <label for="job2">Part Time Jobs</label>
                        <span className={styles.jobnumber}>43</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job3" className={styles.jobstyle} />
                        <label for="job3">Remote Jobs</label>
                        <span className={styles.jobnumber}>24</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job4" className={styles.jobstyle} />
                        <label for="job4">Internship Jobs</label>
                        <span className={styles.jobnumber}>27</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job5" className={styles.jobstyle} />
                        <label for="job5">Contract</label>
                        <span className={styles.jobnumber}>76</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job6" className={styles.jobstyle} />
                        <label for="job6">Training Jobs</label>
                        <span className={styles.jobnumber}>28</span>
                    </div>
                </div>
            </div>
            <div className={styles.jobtime}>
                <div className={styles.jobtimetitle}>Seniority Level</div>
                <div className={styles.jobwrapper}>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job7" className={styles.jobstyle} />
                        <label for="job7">Student Level</label>
                        <span className={styles.jobnumber}>98</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job8" className={styles.jobstyle} />
                        <label for="job8">Entry Level</label>
                        <span className={styles.jobnumber}>44</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job9" className={styles.jobstyle}  />
                        <label for="job9">Mid Level</label>
                        <span className={styles.jobnumber}>35</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job10" className={styles.jobstyle}  />
                        <label for="job10">Senior Level</label>
                        <span className={styles.jobnumber}>29</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job11" className={styles.jobstyle} />
                        <label for="job11">Directors</label>
                        <span className={styles.jobnumber}>26</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job12" className={styles.jobstyle} />
                        <label for="job12">VP or Above</label>
                        <span className={styles.jobnumber}>56</span>
                    </div>
                </div>
            </div>
            <div className={styles.jobtime}>
                <div className={styles.jobtimetitle}>Salary Range</div>
                <div className={styles.jobwrapper}>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job13" className={styles.jobstyle} />
                        <label for="job13">$700 - $1000</label>
                        <span className={styles.jobnumber}>49</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job14" className={styles.jobstyle} />
                        <label for="job14">$1000 - $1200</label>
                        <span className={styles.jobnumber}>67</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job15" className={styles.jobstyle} />
                        <label for="job15">$1200 - $1400</label>
                        <span className={styles.jobnumber}>24</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job16" className={styles.jobstyle} />
                        <label for="job16">$1500 - $1800</label>
                        <span className={styles.jobnumber}>27</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job17" className={styles.jobstyle}  />
                        <label for="job17">$2000 - $3000</label>
                        <span className={styles.jobnumber}>76</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job18" className={styles.jobstyle}  />
                        <label for="job18">$3000 - $4000</label>
                        <span className={styles.jobnumber}>22</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job19" className={styles.jobstyle} />
                        <label for="job19">$4000 - $5000</label>
                        <span className={styles.jobnumber}>18</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
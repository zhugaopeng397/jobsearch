import styles from './sidebar.module.css';
import stylesr from './searchedresult.module.css'
export default function Sidebar() {
    return (
        
        <div className={styles.searchtype}>
            <style>{`
                @media screen and (max-width: 1300px) {
                    .${stylesr.detailpage} .${styles.searchtype} {
                        display: none;
                    }
                }
            `}</style>
            <div className={styles.alert}>
                <div className={styles.alerttitle}>上新提醒</div>
                <div className={styles.alertsubtitle}>输入设备信息关键词，新型号不错过！</div>
                <input type="text" placeholder="输入设备机型" />
                <button className={styles.searchbuttons}>关注</button>
            </div>
            <div className={styles.jobtime}>
                <div className={styles.jobtimetitle}>机床设备</div>
                <div className={styles.jobwrapper}>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job1" className={styles.jobstyle} />
                        <label for="job1">加工中心</label>
                        <span className={styles.jobnumber}>56</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job2" className={styles.jobstyle} />
                        <label for="job2">精雕机</label>
                        <span className={styles.jobnumber}>43</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job3" className={styles.jobstyle} />
                        <label for="job3">数控钻床</label>
                        <span className={styles.jobnumber}>24</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job4" className={styles.jobstyle} />
                        <label for="job4">数控磨床</label>
                        <span className={styles.jobnumber}>27</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job5" className={styles.jobstyle} />
                        <label for="job5">数控冲床</label>
                        <span className={styles.jobnumber}>76</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job6" className={styles.jobstyle} />
                        <label for="job6">数控铣床</label>
                        <span className={styles.jobnumber}>28</span>
                    </div>
                </div>
            </div>
            <div className={styles.jobtime}>
                <div className={styles.jobtimetitle}>注塑相关</div>
                <div className={styles.jobwrapper}>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job7" className={styles.jobstyle} />
                        <label for="job7">电动注塑机</label>
                        <span className={styles.jobnumber}>98</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job8" className={styles.jobstyle} />
                        <label for="job8">伺服注塑机</label>
                        <span className={styles.jobnumber}>44</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job9" className={styles.jobstyle}  />
                        <label for="job9">吹塑机</label>
                        <span className={styles.jobnumber}>35</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job10" className={styles.jobstyle}  />
                        <label for="job10">混色机</label>
                        <span className={styles.jobnumber}>29</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job11" className={styles.jobstyle} />
                        <label for="job11">粉碎回收机</label>
                        <span className={styles.jobnumber}>26</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job12" className={styles.jobstyle} />
                        <label for="job12">挤出机</label>
                        <span className={styles.jobnumber}>56</span>
                    </div>
                </div>
            </div>
            <div className={styles.jobtime}>
                <div className={styles.jobtimetitle}>切割设备</div>
                <div className={styles.jobwrapper}>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job13" className={styles.jobstyle} />
                        <label for="job13">激光切割机</label>
                        <span className={styles.jobnumber}>49</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job14" className={styles.jobstyle} />
                        <label for="job14">中走丝</label>
                        <span className={styles.jobnumber}>67</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job15" className={styles.jobstyle} />
                        <label for="job15">激光焊接机</label>
                        <span className={styles.jobnumber}>24</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job16" className={styles.jobstyle} />
                        <label for="job16">激光打标机</label>
                        <span className={styles.jobnumber}>27</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job17" className={styles.jobstyle}  />
                        <label for="job17">激光清洗机</label>
                        <span className={styles.jobnumber}>76</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job18" className={styles.jobstyle}  />
                        <label for="job18">线切割</label>
                        <span className={styles.jobnumber}>22</span>
                    </div>
                    <div className={styles.typecontainer}>
                        <input type="checkbox" id="job19" className={styles.jobstyle} />
                        <label for="job19">切管机</label>
                        <span className={styles.jobnumber}>18</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
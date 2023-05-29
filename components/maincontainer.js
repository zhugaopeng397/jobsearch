import styles from './maincontainer.module.css';
import Sidebar from './sidebar';
import Searchedresult from './searchedresult';

export default function Maincontainer() {
    
    return (
        <div className={styles.maincontainer}>
            <Sidebar />
            <Searchedresult />
        </div>
    );
}
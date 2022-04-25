
const Home = ({UserStore, doLogout}) => {
    return (
        <div className='Container-fluid mt-3'>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin/all-customers">All Moderators</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin/create-customers">Create Moderator</a>
                </li>
                <li className="nav-item">
                    <div className="nav-link pe-auto" style={{cursor: "pointer"}} onClick={()=>doLogout()}>Logout</div>
                </li>
            </ul>
            <hr></hr>
        Welcome {UserStore.first_name}
        </ div>
    );
}
 
export default Home;
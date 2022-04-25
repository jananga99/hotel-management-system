
import React from 'react';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            dashboard:'',
            allModerators: '',
            createModerator: '',
            allCustomer:'',
            logout: '',
        }
    }

    componentDidMount() {
        this.initializeStates();
    }

    initializeStates() {
        if(this.props.url === 'http://localhost:3000/') {
            this.setState({
                dashboard: 'active',
            });
        }else if(this.props.url === 'http://localhost:3000/admin/all-customers') {
            this.setState({
                allModerators: 'active',
            });
        }else if(this.props.url === 'http://localhost:3000/admin/create-customers') {
            this.setState({
                createModerator: 'active',
            });
        }else if(this.props.url === 'http://localhost:3000/admin/customers'){
            this.setState({
                allCustomer: 'active',
            });
        }
    }

    resetSelector(property, value) {
        value = value.trim();
        this.setState({
            dashboard: '',
            allModerators: '',
            createModerator: '',
            logout: '',
        });
        this.setState({
            [property]: value,
        })
    }

    render(){
        return (
            <div className='Container-fluid mt-3'>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item" onClick={()=>this.resetSelector('dashboard', 'active')}>
                        <a className={"nav-link"+ " " + this.state.dashboard} aria-current="page" href="/">Dashboard</a>
                    </li>
                    <li className="nav-item" onClick={()=>this.resetSelector('allModerators', 'active')}>
                        <a className={"nav-link"+" "+this.state.allModerators} href="/admin/all-customers">All Moderators</a>
                    </li>
                    <li className="nav-item" onClick={()=>this.resetSelector('createModerator', 'active')}>
                        <a className={"nav-link"+" "+this.state.createModerator} href="/admin/create-customers">Create Moderator</a>
                    </li>
                    <li className="nav-item" onClick={()=>this.resetSelector('allCustomer', 'active')}>
                        <a className={"nav-link"+" "+this.state.createModerator} href="/admin/customers">Create Customers</a>
                    </li>
                    <li className="nav-item" onClick={()=>this.resetSelector('logout', 'active')}>
                        <div className={"nav-link pe-auto"+ " "+ this.state.logout} style={{cursor: "pointer"}} onClick={()=>this.props.doLogout()}>Logout</div>
                    </li>
                </ul>
                <hr></hr>
            Welcome {this.props.UserStore.first_name}
            </ div>
        );
    }
}
 
export default Home;
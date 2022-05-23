
import React from 'react';

class Home extends React.Component {

    constructor(props) {
        super(props);
        if (props.type === 0) {
            this.state = {
                dashboard: '',
                allModerators: '',
                createModerator: '',
                allCustomers: '',
                createCustomer: '',
                logout: '',
            }
        } else if (props.type === 1) {
            this.state = {
                dashboard: '',
                allRooms: '',
                createRoom: '',
                logout: '',
            }
        } else {
            this.state = {
                allHotel: ''
            }
        }
    }

    componentDidMount() {
        this.initializeStates();
    }

    initializeStates() {

        if (this.props.type === 0) {
            if (this.props.url === 'http://localhost:3000/') {
                this.setState({
                    dashboard: 'active',
                });
            } else if (this.props.url === 'http://localhost:3000/admin/all-moderators') {
                this.setState({
                    allModerators: 'active',
                });
            } else if (this.props.url === 'http://localhost:3000/admin/create-moderator') {
                this.setState({
                    createModerator: 'active',
                });
            } else if (this.props.url === 'http://localhost:3000/admin/all-customers') {
                this.setState({
                    allCustomers: 'active',
                });
            } else if (this.props.url === 'http://localhost:3000/admin/create-customer') {
                this.setState({
                    createCustomer: 'active',
                });
            }
        } else if (this.props.type === 1) {
            if (this.props.url === 'http://localhost:3000/') {
                this.setState({
                    dashboard: 'active',
                });
            } else if (this.props.url === 'http://localhost:3000/moderator/all-rooms') {
                this.setState({
                    allRooms: 'active',
                });
            } else if (this.props.url === 'http://localhost:3000/moderator/create-room') {
                this.setState({
                    createRoom: 'active',
                });
            }
        } else {
            if (this.props.type === 'http://localhost:3000/') {
                this.setState({
                    allHotel: 'active'
                });
            }
        }

    }

    resetSelector(property, value) {
        value = value.trim();
        if (this.props.type === 0) {
            this.setState({
                dashboard: '',
                allModerators: '',
                allCustomers: '',
                createModerator: '',
                createCustomer: '',
                logout: '',
            });
        } else if (this.props.type === 1) {
            this.state = {
                dashboard: '',
                allRooms: '',
                createRoom: '',
                logout: '',
            }
        } else {
            this.setState({
                allHotel: ''
            })
        }
        this.setState({
            [property]: value,
        })
    }



    render() {
        if (this.props.type === 0) {
            return (
                <div className='Container-fluid mt-3'>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item" onClick={() => this.resetSelector('dashboard', 'active')}>
                            <a className={"nav-link" + " " + this.state.dashboard} aria-current="page" href="/">Dashboard</a>
                        </li>
                        <li className="nav-item" onClick={()=>this.resetSelector('allCustomers', 'active')}>
                            <a className={"nav-link"+" "+this.state.allModerators} href="/admin/all-customers">All Customers</a>
                        </li>
                        <li className="nav-item" onClick={() => this.resetSelector('allModerators', 'active')}>
                            <a className={"nav-link" + " " + this.state.allModerators} href="/admin/all-moderators">All Moderators</a>
                        </li>
                        <li className="nav-item" onClick={() => this.resetSelector('createModerator', 'active')}>
                            <a className={"nav-link" + " " + this.state.createModerator} href="/admin/create-moderator">Create Moderator</a>
                        </li>
                        <li className="nav-item" onClick={()=>this.resetSelector('createCustomer', 'active')}>
                            <a className={"nav-link"+" "+this.state.createModerator} href="/admin/create-customer">Create Customer</a>
                        </li>
                        <li className="nav-item" onClick={() => this.resetSelector('logout', 'active')}>
                            <div className={"nav-link pe-auto" + " " + this.state.logout} style={{ cursor: "pointer" }} onClick={() => this.props.doLogout()}>Logout</div>
                        </li>
                    </ul>
                    <hr></hr>
                    Welcome {this.props.UserStore.first_name}
                </ div>
            );
        } else if (this.props.type === 1) {
            return (
                <div className='Container-fluid mt-3'>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item" onClick={() => this.resetSelector('dashboard', 'active')}>
                            <a className={"nav-link" + " " + this.state.dashboard} aria-current="page" href="/">Dashboard</a>
                        </li>
                        <li className="nav-item" onClick={()=>this.resetSelector('allRooms', 'active')}>
                            <a className={"nav-link"+" "+this.state.allRooms} href="/moderator/all-rooms">All Rooms</a>
                        </li>
                        <li className="nav-item" onClick={()=>this.resetSelector('createRoom', 'active')}>
                            <a className={"nav-link"+" "+this.state.createRoom} href="/moderator/create-room">Create Room</a>
                        </li>
                        <li className="nav-item" onClick={() => this.resetSelector('logout', 'active')}>
                            <div className={"nav-link pe-auto" + " " + this.state.logout} style={{ cursor: "pointer" }} onClick={() => this.props.doLogout()}>Logout</div>
                        </li>
                    </ul>
                    <hr></hr>
                    Welcome {this.props.UserStore.first_name}
                </ div>
            );
        } else {
            return (
                <div className='Container-fluid mt-3'>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item" onClick={() => this.resetSelector('allHotel', 'active')}>
                            <a className={"nav-link" + " " + this.state.allHotel} href="/">All Hotels</a>
                        </li>
                        <li className="nav-item" onClick={() => this.resetSelector('logout', 'active')}>
                            <div className={"nav-link pe-auto" + " " + this.state.logout} style={{ cursor: "pointer" }} onClick={() => this.props.doLogout()}>Logout</div>
                        </li>
                    </ul>
                    <hr></hr>
                    Welcome {this.props.UserStore.first_name}
                </ div>
            );
        }
    }
}

export default Home;
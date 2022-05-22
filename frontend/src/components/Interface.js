import React from 'react';
import { Link } from "react-router-dom";

class Interface extends React.Component {

    constructor(props) {
        super(props);
        if(window.location.href.includes('signup')){
            this.state={
                login:'',
                signup:'active',
            };
        }else {
            this.state={
                login:'active',
                signup:'',
            };
        }
    }

    render() {
        return(
            <>
                <div className="Container-fluid mt-5 mb-5">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item" >
                        <a className={"nav-link "+this.state.login} aria-current="page" href="/">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link "+this.state.signup} href="/signup">Signup</a>
                    </li>
                </ul>
                </div>
            </>
        );
    }
}

export default Interface;
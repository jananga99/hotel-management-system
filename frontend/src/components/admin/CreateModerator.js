import React from 'react';

class CreateModerator extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            mobile:'',
        }
    }

    handleSubmit() {
        
    }

    render() {
        return (
            <>
                <h3 className='mt-3 mb-5'> Create moderator </h3>
                <div classNameName="container" style={{marginLeft:'10px'}}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row mb-3">
                            <label for="inputFirstname" className="col-sm-2 col-form-label">First Name</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" id="inputFirstname" onChange={(e)=>this.setState({
                                    firstName: e.target.value
                                })}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputLastName" className="col-sm-2 col-form-label">Last Name</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" id="inputLastName" onChange={(e)=>this.setState({
                                    lastName: e.target.value
                                })}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="email" className="form-control" id="inputEmail3" onChange={(e)=>this.setState({
                                    email: e.target.value
                                })}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="password" className="form-control" id="inputPassword3" onChange={(e)=>this.setState({
                                    password: e.target.value
                                })}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputMobile" className="col-sm-2 col-form-label">Mobile</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="tel" className="form-control" id="inputMobile" onChange={(e)=>this.setState({
                                    mobile: e.target.value
                                })}/>
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary" style={{
                            marginLeft:'80px',
                            marginTop: '20px',
                        }}>Create</button>
                    </form>
                </div>
            </>
        );
    }
}

export default CreateModerator;
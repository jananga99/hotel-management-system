import React from 'react';
import SubmitButton from '../SubmitButton';
import './editoverlay.css';


class EditOverlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: props.visibility,
            id: props.userid,
            firstName: '',
            lastName: '',
            email: '',
            mobile: -1,
        }
    }

    async makeChange() {
        if(this.state.id > 0) {
            try{
                let res = await fetch('/modifyModerator', {
                    method:'POST', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: this.state.id,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        mobile: this.state.mobile,
                    }),
                })

                let result = await res.json();
                if(result && result.success) {
                    alert("Successfully Updated")
                    window.location.reload(false);
                }else {
                    alert("Data didn't modify completely. Refresh and try again");
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    render() {
        return(
            <div className='overlay' style={{
                display: (this.state.visibility ? 'display' : 'none'),
            }}>
                <div className='container-overlay rounded'>
                <button type='button' className='btn btn-danger' style={{
                    padding: '0px 10px',
                    paddingBottom:'2px',
                    marginRight:'5px',
                    marginTop:'5px',
                    float:'right',
                    marginBottom:'10px'
                }} onClick={()=>{
                    this.setState({
                    visibility: false
                    });
                    this.props.onClick()
                    }
                }>&times;</button>
                    <form className='ml-5 mt-2' style={{
                        paddingLeft:'10px', paddingRight:'10px'
                    }}>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='first-name' className='mb-1'>First Name</label>
                            <input className='form-control' id='first-name' placeholder='Fill if wanted to change' onChange={(e)=>{this.setState({
                                firstName: e.target.value
                            })}}></input>
                        </div>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='last-name' className='mb-1'>Last Name</label>
                            <input className='form-control' id='last-name' placeholder='Fill if wanted to change' onChange={(e)=>{this.setState({
                                lastName: e.target.value
                            })}}></input>
                        </div>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='email' className='mb-1'>Email</label>
                            <input type='email' className='form-control' id='email' placeholder='Fill if wanted to change' onChange={(e)=>{this.setState({
                                email: e.target.value
                            })}}></input>
                        </div>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='mobile' className='mb-1'>Mobile Number</label>
                            <input type='tel' className='form-control' id='mobile' placeholder='Fill if wanted to change' onChange={(e)=>{this.setState({
                                mobile: e.target.value
                            })}}></input>
                        </div>
                    </form>
                    <div className='btn-center mb-3'>
                        <SubmitButton className='col btn-primary ' text='Make Change' onClick={()=>this.makeChange()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditOverlay;
import React from 'react';
import SubmitButton from '../SubmitButton';
import './editoverlay.css';


class EditOverlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: props.visibility,
        }
    }

    setVisibility() {
        this.setState()
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
                }} onClick={()=>this.setState({
                    visibility: false
                })}>&times;</button>
                    <form className='ml-5 mt-2' style={{
                        paddingLeft:'10px', paddingRight:'10px'
                    }}>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='first-name' className='mb-1'>First Name</label>
                            <input className='form-control' id='first-name' placeholder='Fill if wanted to change'></input>
                        </div>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='last-name' className='mb-1'>Last Name</label>
                            <input className='form-control' id='last-name' placeholder='Fill if wanted to change'></input>
                        </div>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='email' className='mb-1'>Email</label>
                            <input type='email' className='form-control' id='email' placeholder='Fill if wanted to change'></input>
                        </div>
                        <div className='form-group mb-3'>
                            <label style={{color: "black", paddingLeft:'10px'}}htmlFor='mobile' className='mb-1'>Mobile Number</label>
                            <input type='email' className='form-control' id='mobile' placeholder='Fill if wanted to change'></input>
                        </div>
                    </form>
                    <div className='btn-center mb-3'>
                        <SubmitButton className='col btn-primary ' text='Make Change'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditOverlay;
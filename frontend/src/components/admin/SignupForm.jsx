import { useState } from "react"

const SignupForm = () => {

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [mobile, setmobile] = useState("")

    return (
        <>
            <div className="container">

                <br /><h3>Signup</h3> <br />
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="firstname">First name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="firstname" placeholder="Enter first name" name="firstname" />
                        </div>
                    </div> <br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="lastname">Last name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="lastname" placeholder="Enter last name" name="lastname" />
                        </div>
                    </div><br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignupForm;
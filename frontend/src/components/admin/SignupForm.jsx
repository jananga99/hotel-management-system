import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignupForm = () => {
    const navigate = useNavigate()

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [mobile, setmobile] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            document.getElementById("invalid-info").innerHTML = "Password and confirm password values do not match!"
        } else if (mobile.length > 12) {
            document.getElementById("invalid-info").innerHTML = "value for mobile field cannot have more than 12 digits!"
        }
        
        else {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password,
                    mobile
                })
            };
            fetch('http://localhost:3001/api/register-customer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("YAYYY", data)
                    navigate("/")
                })
                .catch(err => {
                    console.log("NAYY", err);
                })
        }
    }

    return (
        <>
            <div className="container">

                <br /><h3>Signup</h3> <br />
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="firstname">First name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control"
                                id="firstname" placeholder="Enter first name" name="firstname"
                                onChange={(e) => setfirstname(e.target.value)} />
                        </div>
                    </div> <br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="lastname">Last name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control"
                                id="lastname" placeholder="Enter last name" name="lastname"
                                onChange={(e) => setlastname(e.target.value)} />
                        </div>
                    </div><br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control"
                                id="email" placeholder="Enter email" name="email"
                                onChange={(e) => setemail(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="mobile">Mobile:</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control"
                                id="mobile" placeholder="Enter first name" name="mobile"
                                onChange={(e) => setmobile(e.target.value)} />
                        </div>
                    </div> <br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control"
                                id="password" placeholder="Enter password" name="password"
                                onChange={(e) => setpassword(e.target.value)} />
                        </div>
                    </div> <br />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="pwd">Confirm:</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control"
                                id="ConfirmPassword" placeholder="Enter Confirm Password" name="ConfirmPassword"
                                onChange={(e) => setconfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <div id="invalid-info">

                    </div> <br />
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
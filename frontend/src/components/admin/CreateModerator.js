import { useState } from "react";
import { useNavigate } from "react-router-dom"

const CreateModerator = () => {

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [mobile, setmobile] = useState(0)
    const [isPending, setisPending] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()

        if (firstName.length > 10) {
            setError(" Firstname cannot exceed 254 characters!")
        }
        else if (lastName.length > 10) {
            setError(" Lastname cannot exceed 254 characters!")
        }
        else if (email.length > 10) {
            setError(" Email cannot exceed 254 characters!")
        }
        else if (password.length > 10) {
            setError(" Password cannot exceed 254 characters!")
        }
        else if (mobile.length > 10) {
            setError(" Mobile number cannot exceed 10 characters!")
        }
        else {
            setisPending(true)
            const moderatorData = { first_name: firstName, last_name: lastName, email, password, mobile }

            fetch('http://localhost:3001/api/create-moderator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(moderatorData),
            })
                .then(response => {
                    if (!response.ok) throw Error("Could not fetch the data")
                    response.json()
                })
                .then(data => {
                    console.log('Moderator created: ', data);
                    setisPending(false)
                    console.error('Success:', data)
                    setError('')
                    navigate("/admin/all-moderators")
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setisPending(false)
                    setError(error.message)
                });

        }
    }

    return (
        <>
            {error &&
                <div class="alert alert-warning" role="alert">
                    {error}
                </div>
            }

            <h3> Create moderator </h3>
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row mb-3">
                        <label htmlFor="inputFirstname" className="col-sm-2 col-form-label">Firstname</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="text" className="form-control" id="inputFirstname"
                                onChange={(e) => setfirstName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputLastName" className="col-sm-2 col-form-label">Lastname</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="text" className="form-control" id="inputLastName"
                                onChange={(e) => setlastName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="email" className="form-control" id="inputEmail3"
                                onChange={(e) => setemail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="password" className="form-control" id="inputPassword3"
                                onChange={(e) => setpassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputMobile" className="col-sm-2 col-form-label">Mobile</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="number" className="form-control" id="inputMobile"
                                onChange={(e) => setmobile(e.target.value)} required />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Create Moderator</button>
                </form>
                {isPending && <p> Adding moderator...</p>}
            </div>
        </>
    );
}

export default CreateModerator;
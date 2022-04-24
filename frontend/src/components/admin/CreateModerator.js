const CreateModerator = () => {


    return (
        <>
            <h3> Create moderator </h3>
            <div classNameName="container">
                <form>
                    <div className="row mb-3">
                        <label for="inputFirstname" className="col-sm-2 col-form-label">Firstname</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="text" className="form-control" id="inputFirstname" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="inputLastName" className="col-sm-2 col-form-label">Lastname</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="text" className="form-control" id="inputLastName" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="email" className="form-control" id="inputEmail3" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="password" className="form-control" id="inputPassword3" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="inputMobile" className="col-sm-2 col-form-label">Mobile</label>
                        <div className="col-sm-10 col-lg-7">
                            <input type="tel" className="form-control" id="inputMobile" />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        </>
    );
}

export default CreateModerator;
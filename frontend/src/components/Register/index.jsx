import { Link } from "react-router-dom";



export const RegisterForm = () => {
    return(
        <div className="row mt-5">
            <div className="col-md mt-3">
                <form action="#" className="probootstrap-form w-50 mx-auto mt-5">
                <h2 className="text-center display-5 text-success mt-2">Registration</h2>
                <div className="form-group">
                    <div className="row mb-3">
                    <div className="col-md">
                        <div className="form-group">
                        <label for="fname">First Name</label>
                        <div className="">
                            <input type="text" id="fname" className="form-control" placeholder="Your First Name" />
                        </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                        <label for="lname">Last Name</label>
                        <div className=""> 
                            <input type="text" id="lname" className="form-control" placeholder="Your Last Name" />
                        </div>
                        </div>
                    </div>
                </div>
                    </div>

                    <div className="col-md">
                        <div className="form-group">
                        <div className="">
                        <label for="email" style={{ width: "100%" }}>
                                <input type="email" id="email" className="form-control" placeholder="Your Email Address" />
                            </label>
                        </div>
                        </div>
                    </div>
            
                    <div className="row mb-5">
                    <div className="col-md">
                        <div className="form-group">
                        <label for="pwd">Create Password</label>
                        <div className="">
                            <input type="password" id="pwd" className="form-control" placeholder="Create Your Password" />
                        </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                        <label for="cpwd">Confirm Password</label>
                        <div className="">
                            <input type="password" id="cpwd" className="form-control" placeholder="Confirm The Password" />
                        </div>
                        </div>
                    </div>
                </div>
                    <div className="col-md text-center">
                        <input type="submit" value="Register" className="btn btn-success btn-block" />
                    </div>
                    <div class="text-center my-3">
                        <span class="text-success" style={{ fontSize: "smaller" }}>Already Have An Account? &nbsp; 
                            <Link class="text-danger" to="/login" style={{ textDecoration: "none" }}>Click Here</Link>
                        </span>
                    </div>
            </form></div>
        </div>
    )
}
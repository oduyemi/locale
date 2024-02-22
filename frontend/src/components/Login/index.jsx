import { Link } from "react-router-dom";



export const LoginForm = () => {
    return(
        <div className="row mt-5">
            <div className="col-md mt-5">
                <form action="#" className="probootstrap-form w-50 mx-auto mt-5">
                <h2 className="text-center display-5 text-success mt-2">Login</h2>
                <div className="form-group">
                    <div className="row mb-3">
                        <div className="col-md">
                            <div className="form-group">
                                <label for="email" style={{ width: "100%" }}>
                                    <input type="email" id="email" className="form-control" placeholder="Your Email Address" />
                                </label>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                        <div className="">
                            <label for="pwd" style={{ width: "100%" }}>
                                <input type="password" id="pwd" className="form-control" placeholder="Your Password" />
                            </label>
                        </div>
                        </div>
                    </div>
            
                    <div className="row mb-5">
                    
                </div>
                    <div className="col-md text-center">
                        <input type="submit" value="Login" className="btn btn-success btn-block" />
                    </div>
                    <div class="text-center my-3">
                        <span class="text-success" style={{ fontSize: "smaller"}}>Don't have an account yet? &nbsp;
                            <Link class="text-danger" to="/register" style={{ textDecoration: "none" }}>Click Here</Link>
                        </span>
                    </div>
            </form></div>
        </div>
    )
}
import { Link } from "react-router-dom";




export const Banner = () => {
    return (
        <section className="probootstrap-cover overflow-hidden relative hero mt-3" data-stellar-background-ratio="0.5"  id="section-home">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-md">
                <h2 className="heading mb-2 display-5 font-light">Explore Nigeria With Ease</h2>
                <p className="lead mb-5 animate-pulse">
                    Get to know Nigeria better.<br />
                    Click the button below to see all the regions in Nigeria.           
                </p>
                <Link to="#" role="button" className="btn btn-success p-3 mr-3 pl-5 pr-5 text-uppercase d-lg-inline d-md-inline d-sm-block d-block mb-3">
                    See All Regions
                </Link>  
            </div> 
            <div className="col-md">
                <form action="#" className="probootstrap-form api">
                <div className="form-group">
                    <div className="row mb-3">
                    <div className="col-md">
                        <div className="form-group">
                        
                            <label for="api_key" style={{ width: "100%" }}>
                                <input type="text" id="api_key" className="form-control" placeholder="Enter API Key" />
                            </label>
                        </div>
                    </div>
                    <div className="col-md">
                        <input type="submit" value="Submit" className="btn btn-success btn-block" />
                    </div>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </div>
        
        </section>
    )
}
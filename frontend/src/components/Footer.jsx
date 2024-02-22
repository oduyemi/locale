import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <div className="mx-auto">
            <footer className="p-4 bg-warning shadow d-md-flex align-items-center justify-content-between p-md-6">
                <span className="text-sm text-dark text-sm-center">
                    &copy; 2024 &nbsp;
                         <Link to="#" className="text-danger" style={{ textDecoration: "none"}} target="_blank">
                            LOCALE™
                        </Link>. 
                    All Rights Reserved.
                </span>
                <ul className="d-flex flex-wrap align-items-center mt-md-2 mt-md-0">
                    <li style={{ listStyleType: "none"}}>
                        <Link to="/dashboard" className="me-4 text-sm text-secondary me-md-6" style={{ textDecoration: "none"}}>
                            Dashboard
                        </Link>
                    </li>
                    <li style={{ listStyleType: "none"}}>
                        <Link to="/guide" className="me-4 text-sm text-secondary me-md-6" style={{ textDecoration: "none"}}>
                            Guides
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
                    
    )
}

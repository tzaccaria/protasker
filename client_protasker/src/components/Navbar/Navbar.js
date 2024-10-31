import './Navbar.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"

export default function Navbar(){
    return (
        <nav className="navbar">
		<div className="container-fluid">
			<div className="row w-100">
				<div className="col-3 text-left">
					<p>
						<Link className='fs-3 fw-semibold' to="/">ProTasker</Link>
					</p>
				</div>
				<div className="col"></div>
				<div className="col-2 text-end">
					<p>
						<Link className='fs-3 fw-semibold' to="/taches">Tâches</Link>
					</p>
				</div>
			</div>
		</div>
	</nav>
    );
}
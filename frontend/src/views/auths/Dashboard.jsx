import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

function Dashboard() {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ]);

    return (
        <>
            {isLoggedIn()
                ? <div>
                    Dashboard
                    <Link to="/logout">Logout</Link>
                  </div>
                : <div>
                    <h1>Home Page</h1> 
                    <Link className="btn btn-primary mr-4" clato="/register">Create An Account </Link><br></br>
                    <Link className="btn btn-primary mr-4"to="/login">Login </Link>
                </div>
            }
        </>
    );
}

export default Dashboard;

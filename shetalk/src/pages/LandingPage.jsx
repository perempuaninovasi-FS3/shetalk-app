import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <>
            <Link to={'/create-user-general'}>
                <button>gabung</button>
            </Link>

        </>
    )
}

export default LandingPage;
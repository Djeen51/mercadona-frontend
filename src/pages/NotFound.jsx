import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div>
            <h1>Page not Found</h1>
            <h2>go Back to the <Link to='/' >Homepage</Link></h2>
        </div>
    )
}

export default NotFound

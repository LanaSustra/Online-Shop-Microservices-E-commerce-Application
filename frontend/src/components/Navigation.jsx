import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="container">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/order"}>Orders</Link>
        </li>
      </ul>
    </div>

  )
}

export default Navigation;

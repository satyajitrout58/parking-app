import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" data-testid='allocateLink'>Allocate Parking</Link>
          </li>
          <li>
            <Link to="/onboard" data-testid='onBoardLink'>Onboard Parking</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
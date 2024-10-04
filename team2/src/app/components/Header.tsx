import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header>
      <div className="logo">
        <Link to="/">Rakuten SafetyNest</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/MyList"
              className={`header-nav-link ${
                location.pathname === "/MyList" ? "active" : ""
              }`}
            >
              My List
            </Link>
          </li>
          <li>
            <Link
              to="/group"
              className={`header-nav-link ${
                location.pathname === "/group" ? "active" : ""
              }`}
            >
              Group
            </Link>
          </li>
          <li className="profile-link">
            <Link
              to="/profile"
              className={`header-nav-link ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
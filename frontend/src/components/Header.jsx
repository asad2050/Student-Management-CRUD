import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-full border-b-2 bg-amber-100 border-red-500">
      <div className="mx-auto px-8 py-4">
        <ul className="flex items-center justify-end gap-4">
          <li>
            <Link to="/students" className="hover:font-bold text-red-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:font-bold text-red-600">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

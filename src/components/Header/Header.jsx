import React from "react";
//we will condition render logout button here
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
// difference in navigate and useNav is useNav forcefully
import { useNavigate } from "react-router-dom";

function Header() {
  //check if user is loged in or not (check in redux state)
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  //we use array of obj to add items in nav ->convenint
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          {/* Map through the array of navigation items and create a list item for each one */}
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                //jo cheez repeat hoti h udhar latae h key (::NOTE)
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && ( //for logout (if logged in show logout btn)
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

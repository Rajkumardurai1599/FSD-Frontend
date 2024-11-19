import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;
  const { currentuser } = useSelector((state) => state.user);
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-lg text-white">
          Blog
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search Blog..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        className="w-15 h-10 lg:hidden text-dark"
        gradientDuoTone="cyanToBlue"
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-15 h-10 hidden sm:inline"
          gradientDuoTone="cyanToBlue"
        >
          <FaMoon />
        </Button>
        <link to="/login"></link>
        <Button
          className="w-15 h-10 lg:hidden text-dark"
          gradientDuoTone="cyanToBlue"
        >
          <FaMoon />
        </Button>
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentuser.profilePic} rounded />}
          >
            <Dropdown.Header>
              <span className="black text text-sm">{currentuser.username}</span>
            </Dropdown.Header>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="cyanToBlue">Signin</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/blogs"} as={"div"}>
          <Link to="/blogs">Blogs</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

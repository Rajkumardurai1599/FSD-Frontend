import {Avatar,Button,Dropdown,DropdownDivider,Navbar,TextInput,} from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../Redux/Slice/themeSlice";
import { signOutSuccess } from "../Redux/Slice/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentuser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  //console.log(currentuser);
  const handleSignout = ()=>{
    dispatch(signOutSuccess())
    localStorage.removeItem("Token")
    navigate('/signin')
  }
  return (
    <Navbar className="border-b-2 dark:bg-black">
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
        outline
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          gradientDuoTone="cyanToBlue"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <FaMoon />
          )  : (
            <FaSun />
          )}
        </Button>
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentuser.rest.profilePicture}  rounded /> }
          >
            <Dropdown.Header>
              <span className="black text text-sm">{currentuser.rest.username}</span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="cyanToBlue">
              Signin
              </Button>
          </Link>
        )}
        
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
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

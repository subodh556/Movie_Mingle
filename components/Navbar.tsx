import NavbarItem from "./NavbarItem"
import {BsChevronDown} from 'react-icons/bs';
import MobileMenu from "./MobileMenu";
import { useCallback, useState } from "react";

const Navbar = () => {
  const [showMobileMenu , setshowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(()=>{
    setshowMobileMenu((current)=>!current);
  },[]);

  return (
    <nav className="w-full fixed z-40">
        <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
        <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className="w-4 text-white transition "/>
          <MobileMenu visible={showMobileMenu}/>

        </div>

        </div>
        
    </nav>
  )
}

export default Navbar
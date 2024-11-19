import React from "react";
import { useSelector } from "react-redux";


const ThemeProvider = ({children})=>{
    const {theme}=useSelector((state)=>state.theme)
    return (
<div className={theme}>
<div className="bg-white text-black">
    {children}
</div>
</div>
    );
};

export default ThemeProvider;
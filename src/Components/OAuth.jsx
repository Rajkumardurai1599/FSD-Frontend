import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInFailure, signInsuccess } from "../Redux/Slice/userSlice";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"


const OAuth =()=>{
   const auth =getAuth(app)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const handleSubmit = async()=>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'})
    try {
        const result = await signInWithPopup(auth,provider)
        const res = await fetch("http://localhost:5000/api/auth/google",{
            method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            profilePic:result.user.photoURL
        })      
          
        })
        const data = await res.json();
        if(res.ok){
            dispatch(signInsuccess(data))
            navigate('/')
        }
        
    } catch (error) {
        dispatch(signInFailure(error.message))
    }
   }


   
    return (
        <Button type="button" gradientDuoTone="cyanToBlue" onClick={handleSubmit}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        Continue with Google
        </Button>

    )
}
export default OAuth
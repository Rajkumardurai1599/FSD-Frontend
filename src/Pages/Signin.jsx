import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInsuccess } from '../Redux/Slice/userSlice';
import OAuth from '../Components/OAuth';


const Signin = () => {
    const [formData,setFormData]=useState({});
    const dispatch =useDispatch();
    const {loading,error:errorMessage} =useSelector((state)=>state.user)
    const navigate = useNavigate();
    const handleChange =(e)=>{
        //console.log(e.target.value);
        setFormData({...formData,[e.target.id]:e.target.value})
        //console.log(formData);
    }  


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!formData.email || !formData.password){
            return dispatch(signInFailure(("please fill out the fields")))
        }
        try{ 
            dispatch(signInStart())
            const response = await fetch('http://localhost5000/api/auth/login-user',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await response.json();
            if(data.success === false){
                return dispatch(signInFailure((data.message)));
            }
            if(response.ok){
                return console.log(data.message)
            }
            if(response.ok){
                dispatch.signInsuccess((data))
                navigate('/')
            }


        }catch (error){
            return dispatch(signInFailure((error.message)));
        };
        
    }
    return (
        <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' >
        <div className='flex-1'>
        <div className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-lg text-white'>Blog</span>Blog
        </div>
        <p className='text-sm mt-6'>
            You can sign in with your Email and Password or You can use Google</p>
        </div>
        <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit

            }>
                
                <div>
                    <Label value='Email' />
                    <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
                    
                </div>
                <div>
                    <Label value='Password' />
                    <TextInput type='password' placeholder='Enter Your Password' id='password' onChange={handleChange} />
                    
                </div>
                <Button gradientDuoTone="cyanToBlue" type='submit'disabled={loading}>
                    {loading ? (
                        <>
                        <Spinner color="pink" aria-label="Pink spinner example" />
                        <span className='pl=3'>Loading.....</span>
                        </>
                    ) : (
                        'Sign In'
                    )

                    }</Button>
                    <OAuth />
            </form>
            <div className='flex gap-2 text-sm mt-6'>
                <span>Don't Have An Account ?</span>
                <Link to='/signin'className='text-blue-700'>Sign In</Link>
            </div>
            {errorMessage && (
                <Alert color="info" className='mt-5'><span className="font-medium me-2">Info alert!</span>&nbs;{errorMessage}
                </Alert>
            )}
        </div>
        </div>
        </div>
    );
};

export default Signin;
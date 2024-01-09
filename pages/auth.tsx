import Input from "@/components/Input"
import { use, useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';


const Auth = () => {
    
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [variant, setVariant]=useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
      }, []);
    
    const login = useCallback(async () => {
        try {
          await signIn('credentials', {
            email,
            password,
            
            callbackUrl: '/profiles'
          });
    
          
        } catch (error) {
          console.log(error);
        }
      }, [email , password ]);
    

    const register = useCallback(async () => {
        try {
          await axios.post('/api/register', {
            email,
            name,
            password
          });
          login();
          
        } catch (error) {
            console.log(error);
        }
      }, [email,name,password,login]);
      
      
    return (
        <div className="relative h-full w-full  bg-no-repeat bg-center bg-fixed bg-cover">
          <div className="bg-black w-full h-full lg:bg-opacity-60">
            <nav className="px-12 py-5">
              <img src="/images/logo1.png" className="h-20" alt="Logo" />
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-90 px-4 py-4 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                    {variant==='login'?'Sign in':'Register'}
                </h2>
                <div className="flex flex-col gap-4">
                {variant === 'register' && (
                        <Input
                        id="name"
                        type="text"
                        label="Username"
                        value={name}
                        onChange={(ev:any)=>setName(ev.target.value)}
                        />
                )}
                    
                    <Input
                        label="Email"
                        onChange={(ev:any)=>setEmail(ev.target.value)}
                        id="email"
                        type="email"
                        value={email}
                    />
                    <Input
                        label="Password"
                        onChange={(ev:any)=>setPassword(ev.target.value)}
                        id="password"
                        type="password"
                        value={password}
                    />
                </div>
                <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                    {variant === 'login' ? 'Login' : 'Sign Up'}
                </button>
                
                <p className="text-neutral-500 mt-12">
                    {variant === 'login' ? 'Don\'t have an account ? ' : 'Already have an account? '}
                    <span  onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                        {variant === 'login' ? 'Create an account' : 'Login'}
                    </span>
                </p>
            </div>
            </div>
        </div>
        </div>
      );
}

export default Auth
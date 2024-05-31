import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@surti05/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth = ({type}: {type: "Signup" | "Signin"}) => {
    const navigate = useNavigate();
const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    name: "",
    password: ""
})

async function sendRequest(){
    try{
        console.log(postInputs)
   const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=== "Signin"? "signin" : "signup"}`, postInputs);
   const token = "Bearer " + response.data
   console.log(token)
   localStorage.setItem("token" , token)
   navigate("/blogs");
    }
    catch(e){
        //
        console.log(e);
    }
}

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
        <div className="text-3xl font-extrabold">
            Create an account
        </div>
        <div className="text-slate-400">
            {type === "Signin" ? "Don't have an account?" : "Already have an account?"}  
            <Link className="pl-4 underline" to={type === "Signin" ? "/Signup" : "/Signin"}>
                {type === "Signin" ? "Sign up": "Sign in"}
            </Link>
        </div>
        </div>
        <div className="pt-8">
        {type==="Signup" ? <LabelledInput label= "Name" placeholder= "Surti kakkar..." onChange={(e)=> {
            setPostInputs({
                ...postInputs,
                name: e.target.value
            })
        }} /> : null}

<LabelledInput label= "Username" placeholder= "surti@gmail.com" onChange={(e)=> {
            setPostInputs({
                ...postInputs,
                username: e.target.value
            })
        }} />

<LabelledInput label= "Password" type={"password"} placeholder= "123456" onChange={(e)=> {
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }} />

<button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "Signup" ? "Sign up" : "Sign in"}</button>
        </div>
        </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: HTMLInputTypeAttribute;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType ){
    return <div>
        <div>
            <label className="block mb-2 text-sm pt-2 font-bold  text-gray-900 dark:text-white">{label}</label>
            <input type={type || "text"} id="first_name" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}
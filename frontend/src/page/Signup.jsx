import {useState} from "react";
import {useNavigate} from "react-router-dom"
import {InputBox} from "../components/InputBox";
import {SubHeading} from "../components/SubHeading";
import {Heading} from "../components/Heading";
import {BottomWarning} from "../components/BottomWarning";
import {Button} from "../components/Button";
import axios from "axios"
export const Signup=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox onChange={(e)=>{setFirstName(e.target.value)}} placeholder="John" label={"First Name"}></InputBox>
                <InputBox onChange={(e)=>{setLastName(e.target.value)}} placeholder="Doe" label={"Last Name"}></InputBox>
                <InputBox onChange={(e)=>{setUsername(e.target.value)}} placeholder="abcd@gmail.com" label={"Email"}></InputBox>
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} placeholder="12345" label={"Password"}></InputBox>
                <div className="pt-4">
                    <Button onClick={async ()=>{const response= await axios.post("https://localhost:3000/api/v1/user/signup",{username,firstName,lastName,password});localStorage.setItem("token",response.data.token);navigate("/dashboard")}}label={"Sign up"}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}
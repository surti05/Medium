import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
const Navigate = useNavigate();
    return <div>
        <Appbar />
    <div className="flex justify-center w-full">        
        <div className="max-w-screen-lg w-full">
<label  className="block pt-3 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
<input id="message" type="text" onChange={(e) => {setTitle(e.target.value)}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..." />
<TextEditor onChange={(e) => {setContent(e.target.value)}} />
<button type="submit" onClick={async () => {
    console.log(title);
    console.log(content);
    console.log( localStorage.getItem("token"));
    const response =  await axios.post(`${BACKEND_URL}/api/v1/blog`,
   {title, content},
    {headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
    }}
    );
    Navigate(`/blog/${response.data.user.id}`)
}} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
           Publish post
       </button>
</div>
</div>
    </div>
}

function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}){
    return <div>
       <div className="mt-4  w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       
           <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
               
               <textarea id="editor" onChange={onChange}  className="block w-full focus:outline-none px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Content..." required ></textarea>
           </div>
       </div>
       
       </div>
    
}
import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
}


export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
try{
    console.log(localStorage.getItem("token"))
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
               "Content-Type": "application/json"
            }
        }).then(response => {
            setBlog(response.data.post);
            setLoading(false);

        }).catch(error => console.log(error))
 
    }, [id])
}catch(e){
    console.log(console.error())
}
        return {
            loading,
            blog
        }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
try{
    console.log(localStorage.getItem("token"))
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token"),
               
            }
        }).then(response => {
            setBlogs(response.data.posts);
            setLoading(false);

        }).catch(error => console.log(error))
 
    }, [])
}catch(e){
    console.log(console.error())
}
        return {
            loading,
            blogs
        }
    
}
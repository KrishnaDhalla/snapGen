import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { CircularProgress } from "@mui/material";
import DisplayPost from "./DisplayPost";
const Home = () => {
  const[allPost,setAllPost]=useState([])
  const [loading, setLoading] = useState(true);
  const postRef=collection(db,"post")
  useEffect(()=>{
    const getPosts=async()=>{
      try {
        const data=await getDocs(postRef)
        const filteredData=data.docs.map((doc)=>({
          ...doc.data(),
          id:doc.id,
        }))
        setAllPost(filteredData)
        setLoading(false)
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  },[])
  return (
    <section className="w-full mx-auto mt-14">
      <div className="flex flex-col items-center md:mx-40 mx-10 mt-8">
        <h1 className="font-extrabold text-slate-800 text-3xl">The Community Showcase</h1>
        <p className="mt-2 text-slate-600 text-sm">Browse through a collection of imaginative and visually stunning images generated by Stable Diffusion AI</p>
      </div>
      <div className="mt-10">
        {loading?(
           <div className="flex justify-center items-center">
           <CircularProgress/>
         </div>
        ):(
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 md:gap-10 gap-5 md:mx-48 mx-10 mb-10">
              {
                allPost && allPost.map((post)=>{
                  return(
                    <DisplayPost post={post}/>
                  )
                })
              }
            </div>
        )}
      </div>
      
    </section>
  );
};

export default Home;

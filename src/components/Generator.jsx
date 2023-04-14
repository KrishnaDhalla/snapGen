import React, { useState } from "react";
import { API_TOKEN, auth } from "../firebase-config";
import { CircularProgress } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { collection,addDoc } from "firebase/firestore";
import { db,storage } from "../firebase-config";
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import {v4} from "uuid"
const Generator = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [user] = useAuthState(auth);
  const[prompt,setPrompt]=useState(null)
  const[imageFile,setImageFile]=useState(null)
  const postRef=collection(db,"post")

  const uploadImage=async()=>{
      if(imageFile!==null && prompt!==null){
        const imageRef=ref(storage,`images/${imageFile.name+v4()}`)
        uploadBytes(imageRef,imageFile)
        .then(()=>{
          getDownloadURL(imageRef)
          .then((url)=>{
            addDoc(postRef,{
              prompt:prompt,
              image:url,
              logo:user.photoURL,
              user:user.displayName
            })
          })
        })
        .catch((error)=>console.log(error))
      }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "art.png", { type: "image/png" }));
    setLoading(false);
  };
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "Art.png";
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className="max-w-full rounded-tl-20 rounded-tr-40 rounded-bl-20 rounded-br-40 mx-auto px-10 py-10 bg-transparent">
      <div className="flex flex-col items-start md:mx-40 sm:mx-auto mt-8 ">
        <h1 className="font-extrabold text-slate-800 text-3xl">
          Prompt Your Creativity!
        </h1>
        <p className="mt-2 text-slate-600 text-sm ">
        Browse through a collection of imaginative and visually stunning images generated by Stable Diffusion AI
        </p>
      </div>
      <form
        className="mt-8 flex items-center max-w-screen-xl md:mx-40"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="input"
          className="flex-1 p-3  border border-gray-300 rounded-md focus:outline-slate-800"
          placeholder="Enter your prompt here..."
          onChange={(e)=>setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="md:ml-10 ml-4 border-none w-28 bg-slate-800 rounded-md text-white px-5 py-2 cursor-pointer flex items-center justify-center "
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Generate"
          )}
          {/* <CircularProgress size={20} sx={{color:"white",}} /> */}
        </button>
      </form>
      <div>
        {!loading && output && (
          <div className="max-w-[400px] mx-auto my-10">
            <img src={output} alt="art" className="w-full rounded-md h-auto" />
            <div >
              <button className="bg-blue-100 text-gray-700 border-none p-2 m-2 rounded-md"  onClick={downloadImage}><DownloadIcon /></button>
             {user && <button className="bg-blue-100 text-gray-700 border-none p-2 m-2 rounded-md" onClick={uploadImage}><ShareIcon/></button> }             
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;

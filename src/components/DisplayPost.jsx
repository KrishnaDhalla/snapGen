import React, { useContext} from "react";
import CloseIcon from '@mui/icons-material/Close';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { AppContext } from "../Context";

const DisplayPost = ({ logo, image, prompt, user, id, allPost, setAllPost }) => {
  const {showSnackbar}=useContext(AppContext)
  const handleDelete= async(id)=>{
    try {
      await deleteDoc(doc(db,"post",id))
      setAllPost(allPost.filter(p=>p.id!==id))
      showSnackbar("Image Deleted successfully!!",'success')
    } catch (error) {
      showSnackbar(error.message,'error')
    }
}

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card ">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={image}
        alt={prompt}
      />

      <div
        className={
          "group-hover:flex flex-col max-h-[95%] hidden absolute bottom-0 left-0 right-0 bg-[#fff] m-2 p-4 rounded-md opacity-90"
        }
      >
        <div className="flex flex-col items-center overflow-scroll">
          <div>
            <img
              className="logo mr-2 w-16 h-16 rounded-full"
              src={logo}
              alt={prompt}
            />
          </div>
          <div>
            <span
              style={{
                color: "#888",
                fontSize: "12px",
                textTransform: "lowercase",
              }}
            >
              {user}
            </span>
            <p className="text-xs ">{prompt}</p>
          </div>
        </div>
      </div>
      <button className="absolute rounded-full  bg-blue-100 top-2 right-2" onClick={()=>handleDelete(id)} ><CloseIcon/></button>
    </div>
  );
};

export default DisplayPost;

// prompt.length>200? prompt.slice(0,200)+ '....': prompt

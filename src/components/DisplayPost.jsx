import React from "react";

const DisplayPost = (props) => {
  const { logo, image, prompt, user } = props.post;

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card ">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={image}
        alt={prompt}
      />

<div className={"group-hover:flex flex-col max-h-[95%] hidden absolute bottom-0 left-0 right-0 bg-[#fff] m-2 p-4 rounded-md opacity-90"}>
          <div className="flex flex-col items-center">
            <div>
            <img className='logo mr-2 w-16 h-16 rounded-full' src={logo} alt={prompt} />
            </div>
            <div>
              <span style={{color: "#888",fontSize: "12px", textTransform: "lowercase"}}>{user}</span>
              <p className="text-xs">{prompt.length>200? prompt.slice(0,200)+ '....': prompt}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default DisplayPost;

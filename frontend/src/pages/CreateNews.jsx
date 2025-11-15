import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
const CreateNews = () => {
  const{id} = useParams();
  // console.log(id)
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const singleFun = async()=>{
     if(id){
      const res = await api.get(`/api/news/${id}`);
      if(res.status == 200){
        setAuthor(res.data.message.author);
        setDescription(res.data.message.description);
        setTitle(res.data.message.title);
        setType(res.data.message.type);
      }
     }
    };
    singleFun();
  },[id])

  const updatedNews = async(e)=>{
    try{
      e.preventDefault();
      const data = { title, description, author, type };
      if(id){
         await api.put(`/api/news/${id}`,data);
          navigate("/")
      }
    }catch(err){
      setError(err.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { title, description, author, type };
      // console.log(data);

      await api.post("/api/news/", data);
      navigate("/");
    } catch (err) {
    //   console.log(err.response.data.error);
      setError(err.response.data.error);
    }
    console.log(error)

    // console.log(res)
  };
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className=" text-2xl font-bold mb-6 text-grap-800">
            {id?"Edit" :"Create"} News
          </h1>
          <div>
            <ul className="text-red-600 font-semibold">
                {!!error && error.map((item,id)=>(
                    <li key={id}>* {item.msg}</li>
                ))}
            </ul>
          </div>
          <form onSubmit={id? updatedNews : handleSubmit}>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title.."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter Description.."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter Author.."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Enter title.."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <button className="bg-green-600 mt-1 py-2 px-4  text-white rounded-md hover:bg-green-700 trnasition">
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="w-full bg-green-600 mt-5 py-2 px-4 text-white rounded-md hover:bg-green-700 trnasition"
              >
                {id? "Update News" :"Create News"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNews;

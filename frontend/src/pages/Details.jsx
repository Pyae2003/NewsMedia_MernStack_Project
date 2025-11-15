import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../api/api";

const Details = () => {
    const{id} = useParams();
    // console.log(id)
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [type, setType] = useState("");


    useEffect(()=>{
        const detailsFetch = async()=>{
            try{
                const detailsData = await api.get(`/api/news/${id}`);
              if(detailsData.status == 200){
                setTitle(detailsData.data.message.title);
                setAuthor(detailsData.data.message.author);
                setDescription(detailsData.data.message.description);
                setType(detailsData.data.message.type);
            };

            }catch(err){
                console.log(err)
            }
        }
        detailsFetch();
    },[])
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className=" text-2xl font-bold mb-6 text-grap-800">
            Details Of News
          </h1>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Title : 
              </label>
              <input
                type="text"
                value={title}
                disabled
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
                type="text"
                disabled
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
                disabled
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
                  disabled
                  placeholder="Enter title.."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />

              </div>
            </div>
            <div className="mt-5">
            <Link to={'/'}>
             <button
                type="submit"
                className="w-full bg-green-600 mt-5 py-2 px-4 text-white rounded-md hover:bg-green-700 trnasition"
              >
                Back To Home
              </button>    
            </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default Details;

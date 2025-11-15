import React from "react";
import { api } from "../api/api";
import { Link } from "react-router";

const NewsItem = ({item,deletedNews}) => {
  // console.log(item)
  const deleteNews =async (id)=>{
     const res = await api.delete(`/api/news/${id}`);
     if(res.status == 200){
      deletedNews(id);
     }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-green-800">
            {item.title}
          </h2>
          <p className="text-100 mt-2">
            {item.description}
          </p>
        </div>
        <div className="p-6 pb-6">
          <span className="text-sm text-gray-500">
            Published on : June 20 ,2025
          </span>
          <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500"> Author : {item.author}</div>
            <div className="">
            <Link to={`/detailNews/${item._id}`}>
                 <button className="bg-green-700 text-white rounded-md shadow-md ms-1 p-2">Details</button>
              </Link>
              <Link to={`/updateNews/${item._id}`}>
                 <button className="bg-blue-700 text-white rounded-md shadow-md ms-1 p-2">Update</button>
              </Link>
              <button onClick={()=>{deleteNews(item._id)}} className="bg-red-700 text-white rounded-md shadow-sm ms-1 p-2">Delete</button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

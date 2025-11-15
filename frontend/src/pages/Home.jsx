import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import NewsItem from "../components/NewsItem";
import { useLocation, useNavigate } from "react-router";
import PaginationPart from "../components/PaginationPart";

const Home = () => {
  const [news,setNews] = useState([]);
  const [datalinks,setDatalinks] = useState()

  const location = useLocation();
  const navigator = useNavigate();
  
  const search = new URLSearchParams(location.search);
  const page = search.get("page") || "1";
  
  // console.log(page)
 
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await api.get(`/api/news/?page=${page}`,{withCredentials:true});
       setDatalinks(res.data.dataLinks);
       setNews(res.data.news);  
       window.scroll({
        top : 0,
        left : 0,
        behavior : "smooth"
       })
    };

    fetchData();
  },[page]);


  const deletedNews = async(id) =>{
    // console.log(res.data);
    if(news.length == 1 && page > 1){
      navigator(`/?page=${(page*1)-1}`);
    }else{
      setNews(item => item.filter(remove => remove._id !== id))
    }
  };


  // console.log(news)

//  console.log(datalinks)

  //for pagination 
  //know currentPage ?
  //Know nextPage?
  //know previous Page?
  //need loopLinks
  // know limit data

  //sample data set
  // let dataLink = {
  //   currentPage : 1,
  //   nextPage : true,
  //   previousPage : page,
  //   loopLinks : [
      
  //   ]
  // }
  return (
    <>
      <div className="space-y-3">
        <div className="mx-auto p-8">
          <div className="space-y-6">
            {
              news && (news.map((item,i)=>(
                <NewsItem key={i} item={item} deletedNews={deletedNews}/>
              )))
            }
            {
              !!datalinks && news.length !== 0 && <PaginationPart  link={datalinks} page={page}/>
            }
            {
              !!news.length === 0 ? <h3 className="text-green-600 font-semibold ">There is no data ....</h3>:""
            }
  
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

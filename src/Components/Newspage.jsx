import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Cards from "./Cards";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
const Newspage = () => {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [tpages, setTpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");

  const handlePage = (event) => {
    setCurrentPage(event.selected);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    setQuery(input);
  };

  useEffect(() => {
    setIsloading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://hn.algolia.com/api/v1/search?",
          {
            params: { page: currentPage, query },
          }
        );
        const { hits, nbPages } = data;
        console.log(data);
        setArticles(hits);
        setTpages(nbPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [currentPage, query]);

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-around items-center ">
        <Link to="/">
          <h1 className="text-4xl text-left font-bold mb-4 mt-4">
            Hacker blog
          </h1>
        </Link>
        <div>
          <form
            className="flex flex-row space-x-4 w-500"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Search here"
              style={{ width: "400px" }}
              className=" rounded -t -3xl pl-5 border border-gray-800 "
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center flex-1">
        {isloading ? (
          <div className="mt-72 mb-60">
            <HashLoader color="#a7a7a7" size={100} speedMultiplier={1.2} />
          </div>
        ) : (
          articles.map((article) => (
            <Cards article={article} key={article.objectID} />
          ))
        )}
      </div>
      <ReactPaginate
        nextLabel="Next"
        previousLabel="Previous"
        breakLabel="..."
        forcePage={currentPage}
        pageCount={tpages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        renderOnZeroPageCount={null}
        onPageChange={handlePage}
        activeClassName="bg-black text-white"
        previousClassName="py-2 px-4  text-black rounded-md mr-3 border  border-gray-800"
        nextClassName="py-2 px-4  text-black rounded-md ml-3 border  border-gray-800"
        containerClassName="flex mt-8 mb-8"
        pageClassName="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-xl mr-3 text-sm"
        breakClassName="w-10 h-10 flex items-center justify-center text-gray-700"
      />
    </div>
  );
};

export default Newspage;

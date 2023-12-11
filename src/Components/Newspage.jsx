import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Cards from "./Cards";
import { Button, IconButton } from "@material-tailwind/react";

const Newspage = () => {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [tpages, setTpages] = useState(0);
  const [curentPage, setCurentPage] = useState(0);

  const handlePage = (event) => {
    setCurentPage(event.selected);
  };

  useEffect(() => {
    setIsloading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://hn.algolia.com/api/v1/search?"
        );
        const { hits, nbPages } = data;
        setArticles(hits);
        setTpages(nbPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Hacker blog</h1>
      <div className="news-container">
        {isloading ? (
          <p>Loading ley</p>
        ) : (
          articles.map((article) => (
            <Cards article={article} key={article.objectID} />
          ))
        )}
      </div>
      <ReactPaginate
        nextLabel="Next"
        previousLabel="Pervious"
        breakLabel="..."
        forcePage={curentPage}
        pageCount={tpages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        renderOnZeroPageCount={null}
        onPageChange={handlePage}
        activeClassName=""
        previousClassName=""
        nextClassName=""
      />
    </div>
  );
};

export default Newspage;

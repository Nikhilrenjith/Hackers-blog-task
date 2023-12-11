import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const [articleDetails, setArticleDetails] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    // Fetch the details based on the article ID from the URL params
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://hn.algolia.com/api/v1/items/${articleId}`
        );
        setArticleDetails(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, [articleId]);

  return (
    <div>
      <h2>{articleDetails.title}</h2>
      <p>{articleDetails.author}</p>
    </div>
  );
};

export default Details;

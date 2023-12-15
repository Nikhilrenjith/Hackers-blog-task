import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Details = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://hn.algolia.com/api/v1/items/${id}`
        );

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <div>Details</div>;
};

export default Details;

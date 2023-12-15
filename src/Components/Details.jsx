import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const Details = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [visibleChildren, setVisibleChildren] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/items/${id}`
        );
        setPostData(response.data);
        console.log(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const loadMore = () => {
    setVisibleChildren((prev) => prev + 10);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Link to="/">
        <h1 className="text-4xl font-bold mb-4 ml-40 pt-4">Hacker blog</h1>
      </Link>
      {postData && (
        <div>
          <Card className="mt-8 w-4/5 ml-40">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2"
                style={{ width: "700px" }}
              >
                {postData.title}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-row space-x-1 italic">
                  <p className="text-black font-bold">By:</p>
                  <p>{postData.author}</p>
                </div>
                <div className="flex flex-row space-x-1 italic">
                  <p className="text-black font-bold">Posted:</p>
                  <p>
                    {formatDistanceToNow(new Date(postData.created_at), {
                      addSuffix: true,
                      roundingMethod: "floor",
                      includeSeconds: true,
                    })}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
          {postData.children && postData.children.length > 0 && (
            <div>
              {postData.children
                .slice(0, visibleChildren)
                .map((child, index) => (
                  <Card key={index} className="mt-8 ml-60 w-3/4">
                    <CardBody>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-2"
                        style={{
                          width: "95%",
                        }}
                      >
                        {child.text}
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <div className="flex flex-row space-x-4">
                        <div className="flex flex-row space-x-1 italic">
                          <p className="text-black font-bold">By:</p>
                          <p>{child.author}</p>
                        </div>
                        <div className="flex flex-row space-x-1 italic">
                          <p className="text-black font-bold">Posted:</p>
                          <p>
                            {formatDistanceToNow(new Date(child.created_at), {
                              addSuffix: true,
                              roundingMethod: "floor",
                              includeSeconds: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              {postData.children.length > visibleChildren && (
                <div className="ml-60 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 my-8 rounded mr-4"
                    onClick={loadMore}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Scroll to Top Button */}
      <div
        className="fixed bottom-4 right-4 bg-blue-500 text-white mr-4 my-4 p-3 rounded-full cursor-pointer"
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </div>
    </div>
  );
};

export default Details;

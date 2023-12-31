import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaArrowsAltV } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ article }) => {
  return (
    <div>
      <Link to={`/details/${article.story_id}`}>
        <Card className="mt-8 ">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2"
              style={{ width: "1100px" }}
            >
              {article.title}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex flex-row space-x-4">
              <div className="flex flex-row space-x-1 italic items-center">
                <p className="text-black font-bold">
                  <FaArrowsAltV />
                </p>
                <p>{article.points}</p>
              </div>
              <div className="flex flex-row space-x-1 italic">
                <p className="text-black font-bold">By:</p>
                <p>{article.author}</p>
              </div>
              <div className="flex flex-row space-x-1 italic">
                <p className="text-black font-bold">Posted:</p>
                <p>
                  {formatDistanceToNow(new Date(article.created_at), {
                    addSuffix: true,
                    roundingMethod: "floor",
                    includeSeconds: true,
                  })}
                </p>
              </div>
              <div className="flex flex-row space-x-1 ">
                <p className="font-bold">{article.num_comments}</p>
                <p>comments</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default Cards;

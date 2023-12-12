import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";

const PostDetailPage = () => {
 
  const [postDetails, setPostDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
       
        const response = await fetch(
          `https://hn.algolia.com/api/v1/items/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setPostDetails(result);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
       
      }
    };

    fetchPostDetails();
  }, [id]);

  if (!postDetails) {
    return <div className="flex justify-center pt-[20%]"><Spinner/></div>;
  }

  return (
    <div className="w-[100vw] h-[100%] bg-black overflow-x-hidden">
      {/* Heading */}
      <div className="text-white text-center p-3 tracking-[15px] bg-red-600 shadow-yellow-500 shadow-md">
        <h1 className="md:text-[30px] text-[20px] font-bold tracking-[15px]">Post Details</h1>
      </div>

      {/* Post Details */}
      <div className="w-[90%] pt-[4%] pb-5 flex mx-auto justify-center">
        <div className="w-[60%] flex flex-col items-center ">
          <h2 className="text-white md:text-[30px] text-[15px]">{postDetails.title}</h2>
          <p className="text-white text-xs pt-2">Points : {postDetails.points}</p>

          <div>
          <p className="text-white pt-10 underline">List of comments</p>
          </div>

          <ul className="text-white text-sm list-disc pt-10 w-[100%]">
            {postDetails.children &&
              postDetails.children.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Export the PostDetailPage component
export default PostDetailPage;

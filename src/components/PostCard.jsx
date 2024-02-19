import React, { useEffect, useState } from "react";
// this is component that show card (preview at home page of blogs)

import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// appwrite give id in form of $id (just variable)
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-xl max-h-62 bg-indigo-950 rounded-xl p-4">
        <div className="w-full justify-center mb-4 h-40 overflow-hidden">
          <img
            //$id is (blog post id) && featuredImage is (that image id)
            //so we passed that image id to get preview
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

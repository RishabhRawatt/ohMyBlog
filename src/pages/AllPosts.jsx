import React, { useState, useEffect } from "react";

// to get all posts
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    appwriteService
      .getPosts([]) // we pass empty array cause we want all posts (all means all active)
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

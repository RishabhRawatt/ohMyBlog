import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const [post, setPosts] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
          // Check if the logged-in user is the author
          if (userData && post.userId !== userData.$id) {
            // If not the same author, navigate to the home page or display an unauthorized message
            setUnauthorized(true);
          }
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate, userData]);

  //if try to bypass Auth by changing url
  if (unauthorized) {
    return (
      <div className="py-8">
        <Container>
          <h3>You are not authorized to edit this post.</h3>
          <p>Tej ban raha h ..</p>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;

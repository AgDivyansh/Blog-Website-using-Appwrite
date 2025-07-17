import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div
                className = 'p-2 w-1/4'
            >
              <PostCard 
              key={post.$id} 
              post={post} 
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

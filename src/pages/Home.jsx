import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { supabase } from "../supabaseClient"; // Ensure this is correctly configured
import queryString from 'query-string';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { cat } = queryString.parse(useLocation().search);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data with category:", cat);
      try {
        let query = supabase.from('posts').select('*');
        if (cat) {
          query = query.eq('cat', cat);
        }

        const { data, error } = await query;
        console.log("Fetched data:", data);

        if (error) throw error;

        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchData();
  }, [cat]);

  console.log(posts);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt={post.title} />
              </div>
              <div className="content">
                <Link className='link' to={`/post/${post.id}`}> {/* Corrected Link */}
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.description)}</p>
                <Link className='link' to={`/post/${post.id}`}> {/* Corrected Link */}
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;



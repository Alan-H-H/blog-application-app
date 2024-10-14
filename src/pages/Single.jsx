import { supabase }  from "../supabaseClient";
import React, { useEffect, useState } from "react";
import Edit from "../img/edit.jpg";
import Delete from "../img/Delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the post by ID from the Supabase table
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) throw error; // Handle errors accordingly
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      // Deleting the post from the Supabase table
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error; // Handle errors accordingly

      navigate("/"); // Redirect to the home page after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post.img} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span></span>
            <p>Posted {moment(post.date).fromNow()}</p> 
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.description)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;

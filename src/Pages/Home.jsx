import { useNavigate } from "react-router-dom";

export default function Home({ posts, handleDelete: onDelete }) {
  const navigate = useNavigate();

  return (
    <section className="posts">
      {posts.map((post) => (
        <article key={post.id} className="post">
          <div className="post-header">
            <h2>{post.title}</h2>
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit/${post.id}`)}
            >
              Edit
            </button>
          </div>
          <small className="post-datetime">{post.datetime}</small>
          <p className="post-content">{post.body}</p>
          <button onClick={() => onDelete(post.id)} className="delete-btn">
            Delete
          </button>
        </article>
      ))}
    </section>
  );
}

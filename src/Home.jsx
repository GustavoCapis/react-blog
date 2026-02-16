import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();

  return (
    <section className="posts">
      {props.posts.map((post) => (
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
          <button
            onClick={() => props.handleDelete(post.id)}
            className="delete-btn"
          >
            Delete
          </button>
        </article>
      ))}
    </section>
  );
}

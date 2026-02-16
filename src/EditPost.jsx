import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditPost(props) {
  const { id } = useParams();
  const post = props.posts.find((post) => id === post.id);

  useEffect(() => {
    if (post) {
      props.setEditTitle(post.title);
      props.setEditBody(post.body);
    }
  }, [post, props.setEditTitle, props.setEditBody]);

  return (
    <section className="new-post-section">
      {props.editTitle && (
        <>
          <h2>Edit Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.handleEdit(id);
            }}
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={props.editTitle}
              onChange={(e) => props.setEditTitle(e.target.value)}
            />
            <label htmlFor="body">Post:</label>
            <textarea
              value={props.editBody}
              onChange={(e) => props.setEditBody(e.target.value)}
              name="body"
              id="body"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post not found ☹️</h2>
          <p>Sorry, the post you've been looking for doesn't exist.</p>
          <p>
            <Link to="/"> Go back to Homepage</Link>
          </p>
        </>
      )}
    </section>
  );
}

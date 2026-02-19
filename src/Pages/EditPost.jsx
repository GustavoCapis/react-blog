import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditPost({
  posts,
  editTitle,
  editBody,
  onEditTitle,
  onEditBody,
  onSubmitEdit,
}) {
  const { id } = useParams();
  const post = posts.find((post) => id === post.id);

  useEffect(() => {
    if (post) {
      onEditTitle(post.title);
      onEditBody(post.body);
    }
  }, [post, onEditTitle, onEditBody]);

  return (
    <section className="new-post-section">
      {post ? (
        <>
          <h2>Edit Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitEdit(id);
            }}
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={editTitle}
              onChange={(e) => onEditTitle(e.target.value)}
              required
            />
            <label htmlFor="body">Post:</label>
            <textarea
              value={editBody}
              onChange={(e) => onEditBody(e.target.value)}
              name="body"
              id="body"
              required
            ></textarea>
            <button
              disabled={!editTitle.trim() || !editBody.trim()}
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
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

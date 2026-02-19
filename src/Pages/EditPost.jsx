import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditPost({posts, editTitle, editBody, setEditTitle, setEditBody, handleEdit}) {
  const { id } = useParams();
  const post = posts.find((post) => id === post.id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <section className="new-post-section">
      {post ? (
        <>
          <h2>Edit Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(id);
            }}
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <label htmlFor="body">Post:</label>
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
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

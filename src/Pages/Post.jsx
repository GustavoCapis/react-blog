export default function Post({
  postTitle,
  postBody,
  onTitleChange,
  onBodyChange,
  onSubmit,
}) {
  return (
    <section className="new-post-section">
      <h2>New Post</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={postTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />
        <label htmlFor="body">Post:</label>
        <textarea
          value={postBody}
          onChange={(e) => onBodyChange(e.target.value)}
          required
          name="body"
          id="body"
        ></textarea>
        <button disabled={!postTitle.trim() || !postBody.trim()} type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}

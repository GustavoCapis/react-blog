export default function Post() {
  return (
    <section className="new-post-section">
      <h2>New Post</h2>
      <form action="">
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="body">Post:</label>
        <textarea name="body" id="body"></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

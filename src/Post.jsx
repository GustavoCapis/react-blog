export default function Post(props) {
  return (
    <section className="new-post-section">
      <h2>New Post</h2>
      <form action="">
        <label htmlFor="title">Title:</label>
        <input 
        type="text" 
        name="title" 
        id="title" 
        value={props.postTitle}
        onChange={(e)=> props.setPostTitle(e.target.value)}/>
        <label htmlFor="body">Post:</label>
        <textarea 
        value={props.postBody}
        onChange={(e)=>props.setPostBody(e.target.value)}
        name="body" 
        id="body"></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

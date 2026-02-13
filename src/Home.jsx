export default function Home(props) {
  return (
    <section className="posts">
      {props.posts.map((post) => (
        <article key={post.id} className="post">
          <h2 className="post-title">{post.title}</h2>
          <small className="post-datetime">{post.datetime}</small>
          <p className="post-content">{post.body}</p>
        </article>
      ))}
    </section>
  );
}

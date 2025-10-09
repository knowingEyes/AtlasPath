import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanityClient";
import BlogPreviewItems from "../components/BlogPreviewItems";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all blogs
  useEffect(() => {
    async function fetchBlogs() {
      setIsloading(true);
      try {
        const query = `*[_type == "blog"]{
    title,
    tag,
    slug,
    date,
    image
    }`;
        const blogs = await sanityClient.fetch(query);
        setBlogs(blogs);
        console.log(blogs);
      } catch (e) {
        setError(e);
      } finally {
        setIsloading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="text-black">
      <ul>
        {blogs.map(({ title, tag, date, image, slug }) => (
          <BlogPreviewItems
            title={title}
            createdAt={date}
            tag={tag}
            image={image}
            key={title}
            slug={slug}
          />
        ))}
      </ul>
    </section>
  );
};

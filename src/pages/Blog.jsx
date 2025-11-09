import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanityClient";
import BlogPreviewItems from "../components/BlogPreviewItems";
import BlogPreviewSkeleton from "../skeletons/BlogPreviewSkeleton";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all blogs
  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
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
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (isLoading) return <BlogPreviewSkeleton blogs={blogs} />;

  return (
    <section className="text-black">
      <ul className="pb-25 max-w-[1024px] mx-auto">
        {blogs.map(({ title, tag, date, image, slug }) => (
          <BlogPreviewItems
            title={title}
            createdAt={date}
            tag={tag}
            image={image}
            key={title}
            slug={slug}
            isLoading={isLoading}
          />
        ))}
      </ul>
    </section>
  );
};

import { Children, useEffect, useState } from "react";
import { sanityClient } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";
export const Blog = () => {
  const [blogs, setBlogs] = useState([1, 2, 3]);

  // Fetch all blogs
  useEffect(() => {
    async function fetchBlogs() {
      const query = `*[_type == "blog"]{
    title,
    content,
    cities,
    tag,
    slug
    }`;
      const blogs = await sanityClient.fetch(query);
      setBlogs(blogs);
      ;
    }
    fetchBlogs();
  }, []);
  console.log(blogs)

  // if (!blogs.length) return;
  return (
    <section className="text-black">
      <ul>
      {blogs.map((value) => (
        <PortableText
          components={{
            block: {
              h5: ({ children }) => (
                <h5 className="text-amber-300 my-3 font-bold">{children}</h5>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li className="">{children}</li>,
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-decimal px-5">{children}</ul>
              ),
            },
          }}
        />
      ))}
      </ul>
    </section>
  );
};

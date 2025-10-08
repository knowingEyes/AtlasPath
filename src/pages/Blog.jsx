import {  useEffect, useState } from "react";
import { sanityClient } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import BlogPreviewItems from "../components/BlogPreviewItems";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs
  useEffect(() => {
    async function fetchBlogs() {
      const query = `*[_type == "blog"]{
    title,
    tag,
    slug,
    date,
    image
    }`;
      const blogs = await sanityClient.fetch(query);
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);


  // if (!blogs.length) return;
  return (
    <section className="text-black">
      <ul>
        {blogs.map(({title, tag, date, image})=> <BlogPreviewItems title={title} createdAt={date} tag={tag} image={image} key={title}/>)}
      {/* {blogs.map((value) => (
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
      ))} */}
      </ul>
    </section>
  );
};

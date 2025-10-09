import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { dateFormatter } from "../utils/dateFormatter";

const BlogContent = () => {
  const { slug } = useParams();
  const [blogs, setblogs] = useState({});
  const { cities: bestCities } = blogs;

  const query = `*[_type == 'blog' && slug.current == '${slug}'][0]
`;
  const updated = dateFormatter(blogs?._updatedAt);
  useEffect(() => {
    const getBlogs = async () => {
      const data = await sanityClient.fetch(query);
      setblogs(data);
    };
    getBlogs();
  }, [query]);
  console.log(blogs);
  if (!bestCities) return <p>loading...</p>;
  return (
    <main className="p-5 ">
      <h1 className="text-3xl font-bold text-center mt-5">{blogs.title}</h1>
      <hr className="border-gray-400 m-5 " />
      <span className="text-lg text-center block mb-4">
        <i>
          Updated <time>{updated}</time>{" "}
        </i>
      </span>
      <ul className="list-decimal">
        {bestCities.map(({ content, name, image }) => (
          <li>
            <h2 className="font-bold text-2xl my-2">{name}</h2>
            <img src={image} alt={name} loading="lazy" className="block my-4" />
            <article>
              <PortableText
                value={content}
                components={{
                  block: {
                    h5: ({ children }) => (
                      <h5 className="font-semibold text-lg mb-2 mt-1">
                        {children}
                      </h5>
                    ),
                  },
                }}
              />
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BlogContent;

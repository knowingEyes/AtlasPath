import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { dateFormatter } from "../utils/dateFormatter";
import { Message } from "../components/Message";
import { HashLoader } from "react-spinners";

const BlogContent = () => {
  const { slug } = useParams();
  const [blogs, setblogs] = useState({});
  const { cities: bestCities } = blogs;
  const [isLoading, setIsLoading] = useState(false);
  const query = `*[_type == 'blog' && slug.current == '${slug}'][0]
`;
  const updated = dateFormatter(blogs?._updatedAt);
  useEffect(() => {
    const getBlogs = async () => {
      setIsLoading(true);
      const data = await sanityClient.fetch(query);
      setblogs(data);
      setIsLoading(false);
    };
    getBlogs();
  }, [query]);

  if (isLoading)
    return (
      <Message type="fullscreen" message="Fetching blog...">
        <HashLoader />
      </Message>
    );
  return (
    <main className="p-5 ">
      <h1 className="text-3xl max-md:text-2xl font-bold  mt-5">{blogs.title}</h1>
      <hr className="border-gray-400 my-5 " />
      <span className="text-lg max-md:text-sm  block mb-4">
        <i>
          Updated <time>{updated}</time>{" "}
        </i>
      </span>
      <ul className="list-decimal">
        {bestCities?.map(({ content, name, image }) => 
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
        )}
      </ul>
    </main>
  );
};

export default BlogContent;

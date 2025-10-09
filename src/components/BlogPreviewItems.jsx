import { Link } from "react-router-dom";
import { dateFormatter } from "../utils/dateFormatter";

const BlogPreviewItems = ({ image, tag, createdAt, title, slug }) => {
    const formattedDate = dateFormatter(createdAt);
  return (
    <li className="p-4 rounded-lg shadow-lg bg-[#f5f5f5]">
      <Link className="flex space-x-4 justify-between" to={`/blog/${slug.current}`}>
        <img src={image} alt={tag} className="block max-w-[110px] object-cover rounded-lg" loading="lazy" />
        <div>
          <h1 className="font-bold text-xl ">{title}</h1>
          <div>{tag}</div>
          <time className="text-xs">{formattedDate}</time>
        </div>
      </Link>
    </li>
  );
};

export default BlogPreviewItems;

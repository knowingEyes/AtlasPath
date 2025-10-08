import { dateFormatter } from "../utils/dateFormatter";

const BlogPreviewItems = ({ image, tag, createdAt, title }) => {
    const formattedDate = dateFormatter(createdAt);
  return (
    <li className="p-4 rounded-lg shadow-lg bg-[#f5f5f5]">
      <div className="flex space-x-4 justify-between">
        <img src={image} alt={tag} className="block max-w-[110px] object-cover rounded-lg" loading="lazy" />
        <div>
          <h1 className="font-bold text-xl ">{title}</h1>
          <div>{tag}</div>
          <time className="text-xs">{formattedDate}</time>
        </div>
      </div>
    </li>
  );
};

export default BlogPreviewItems;

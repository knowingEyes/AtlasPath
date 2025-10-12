const BlogPreviewSkeleton = ({ blogs }) => {
  return (
    <div className="">
      {[...Array(blogs.length || 7)].map(() => (
        <div className="w-full h-35 max-w-[1024px] bg-gray-400 animate-pulse mb-4 shadow- rounded-lg mx-auto"></div>
      ))}
    </div>
  );
};

export default BlogPreviewSkeleton;

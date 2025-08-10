const TagSkeleton = () => (
  <div className="flex items-center my-1 h-[42px] gap-2 px-4 py-1.5 bg-white rounded-lg mr-2 shadow-sm animate-pulse border-4 border-gray-100">
    <div className="flex items-center gap-2">
      {/* Tag icon/image placeholder */}
      <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0"></div>

      {/* Tag name placeholder */}
      <div className="h-3 bg-gray-200 rounded w-[80px]"></div>
    </div>
  </div>
);

export default TagSkeleton;

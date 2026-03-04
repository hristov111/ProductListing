type LoadMoreProps = {
  onClick: () => void;
  hasMore: boolean;
};

function LoadMore({ onClick, hasMore }: LoadMoreProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200"
      >
        Load More
      </button>
    </div>
  );
}

export default LoadMore;

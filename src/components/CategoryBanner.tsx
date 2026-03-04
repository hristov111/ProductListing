type CategoryBannerProps = {
  name: string;
  description: string;
};

function CategoryBanner({ name, description }: CategoryBannerProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{name}</h1>
      <p className="text-sm sm:text-base text-gray-500 max-w-2xl">{description}</p>
    </div>
  );
}

export default CategoryBanner;

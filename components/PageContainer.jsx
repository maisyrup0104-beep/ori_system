export default function PageContainer({ children, title, description }) {
  return (
    <div className="flex-1 bg-white">
      <div className="p-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-700 mt-2 font-medium">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

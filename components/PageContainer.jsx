export default function PageContainer({ children, title, description }) {
  return (
    <div className="flex-1">
      <div className="p-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-600 mt-2">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

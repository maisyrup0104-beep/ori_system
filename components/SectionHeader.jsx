export default function SectionHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="text-gray-700 text-sm mt-1 font-medium">{description}</p>
      )}
    </div>
  );
}

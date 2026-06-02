export default function SectionHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      )}
    </div>
  );
}

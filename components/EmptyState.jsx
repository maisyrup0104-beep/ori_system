export default function EmptyState({ title, description, action }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-pink-50 rounded-lg border border-green-200 p-12 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 text-sm mb-4 font-medium">{description}</p>
      {action && action}
    </div>
  );
}

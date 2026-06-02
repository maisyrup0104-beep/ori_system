export default function MetricCard({ label, value, subtext, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtext && (
            <p className="text-gray-500 text-xs mt-2">{subtext}</p>
          )}
        </div>
        {Icon && (
          <Icon className="text-gray-400" size={24} />
        )}
      </div>
    </div>
  );
}

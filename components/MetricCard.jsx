export default function MetricCard({ label, value, subtext, icon: Icon }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-pink-50 rounded-lg border border-green-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 text-sm font-semibold">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtext && (
            <p className="text-gray-600 text-xs mt-2">{subtext}</p>
          )}
        </div>
        {Icon && (
          <Icon className="text-green-600" size={24} />
        )}
      </div>
    </div>
  );
}

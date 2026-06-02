export default function EventBadge({ type, subtype }) {
  const typeColors = {
    'Conversation': 'bg-blue-100 text-blue-800',
    'Visit': 'bg-purple-100 text-purple-800',
    'Demo': 'bg-indigo-100 text-indigo-800',
    'Reply': 'bg-cyan-100 text-cyan-800',
    'Learning': 'bg-yellow-100 text-yellow-800',
    'Outreach': 'bg-orange-100 text-orange-800',
    'Lead': 'bg-red-100 text-red-800',
    'Client': 'bg-green-100 text-green-800',
    'Revenue': 'bg-emerald-100 text-emerald-800',
    'Observation': 'bg-slate-100 text-slate-800',
    'Discovery': 'bg-pink-100 text-pink-800',
    'Validation': 'bg-lime-100 text-lime-800',
    'Journey': 'bg-violet-100 text-violet-800',
  };

  const color = typeColors[type] || 'bg-gray-100 text-gray-800';

  return (
    <div className="flex gap-2">
      <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
        {type}
      </span>
      {subtype && (
        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
          {subtype}
        </span>
      )}
    </div>
  );
}

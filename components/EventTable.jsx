'use client';

import EventBadge from './EventBadge';
import DataTableShell from './DataTableShell';

export default function EventTable({ events, onRowClick, loading }) {
  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading events...</div>;
  }

  if (!events || events.length === 0) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-pink-50 rounded-lg border border-green-200 p-12 text-center">
        <p className="text-gray-700 font-medium">No events found. Create your first event!</p>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <DataTableShell columns={['Date', 'Title', 'Type', 'Segment', 'Visibility', 'Strength']}>
      {events.map((event) => (
        <tr
          key={event.id}
          onClick={() => onRowClick(event)}
          className="hover:bg-green-50 cursor-pointer transition-colors"
        >
          <td className="px-6 py-4 text-sm text-gray-900 font-medium">
            {formatDate(event.created_at)}
          </td>
          <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">
            {event.title}
          </td>
          <td className="px-6 py-4 text-sm">
            <EventBadge type={event.event_type} subtype={event.event_subtype} />
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {event.segment}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {event.visibility_target}
          </td>
          <td className="px-6 py-4 text-sm">
            <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-green-100 rounded font-bold text-gray-900">
              {event.strength}
            </span>
          </td>
        </tr>
      ))}
    </DataTableShell>
  );
}

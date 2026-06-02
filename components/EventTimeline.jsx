'use client';

import EventBadge from './EventBadge';

export default function EventTimeline({ events, onEventClick, loading }) {
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

  // Group events by date
  const groupedByDate = {};
  events.forEach(event => {
    const date = new Date(event.created_at).toLocaleDateString('en-PH');
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(event);
  });

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <div className="flex items-center gap-4 mb-4">
            <h3 className="font-bold text-lg text-gray-900">{date}</h3>
            <div className="flex-1 h-px bg-green-200"></div>
            <span className="text-sm font-semibold text-gray-600 bg-gradient-to-r from-pink-100 to-green-100 px-3 py-1 rounded">
              {groupedByDate[date].length} event{groupedByDate[date].length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-3">
            {groupedByDate[date].map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className="bg-white border border-green-200 rounded-lg p-4 hover:shadow-md hover:border-pink-300 cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">
                        {formatTime(event.created_at)}
                      </span>
                      <span className="px-2 py-1 bg-gradient-to-r from-pink-100 to-green-100 rounded text-xs font-bold text-gray-900">
                        +{event.strength}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">{event.title}</h4>
                  </div>
                </div>

                <div className="mb-2">
                  <EventBadge type={event.event_type} subtype={event.event_subtype} />
                </div>

                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{event.segment}</span>
                  <span>•</span>
                  <span>{event.visibility_target}</span>
                </div>

                {event.notes && (
                  <p className="mt-3 text-sm text-gray-700 bg-gray-50 p-2 rounded line-clamp-2">
                    {event.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

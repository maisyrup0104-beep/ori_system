'use client';

import { X, Edit2, Trash2 } from 'lucide-react';
import EventBadge from './EventBadge';

export default function EventDetailDrawer({ isOpen, event, onClose, onEdit, onDelete }) {
  if (!isOpen || !event) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-green-200 bg-gradient-to-r from-pink-50 to-green-50">
          <h2 className="text-lg font-bold text-gray-900">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Event Badge */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Type</label>
            <EventBadge type={event.event_type} subtype={event.event_subtype} />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Title</label>
            <p className="text-lg font-semibold text-gray-900">{event.title}</p>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Date</label>
            <p className="text-gray-900">{formatDate(event.created_at)}</p>
          </div>

          {/* Segment */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Segment</label>
            <p className="text-gray-900">{event.segment}</p>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Visibility</label>
            <p className="text-gray-900">{event.visibility_target}</p>
          </div>

          {/* Strength */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Strength</label>
            <div className="px-4 py-2 bg-gradient-to-r from-pink-100 to-green-100 rounded-lg border border-green-200 text-center">
              <p className="text-2xl font-bold text-gray-900">{event.strength}</p>
            </div>
          </div>

          {/* Notes */}
          {event.notes && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Notes</label>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{event.notes}</p>
            </div>
          )}

          {/* Proof URL */}
          {event.proof_url && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Proof URL</label>
              <a
                href={event.proof_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 font-semibold break-all"
              >
                {event.proof_url}
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-green-200">
            <button
              onClick={() => {
                onEdit(event);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 font-semibold"
            >
              <Edit2 size={18} />
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this event?')) {
                  onDelete(event.id);
                  onClose();
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 font-semibold"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

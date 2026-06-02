'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ALL_EVENT_TYPES, SEGMENTS, VISIBILITY_OPTIONS, getSubtypesForType, calculateStrength } from '@/lib/eventConfig';

export default function EventForm({ isOpen, event, onClose, onSubmit, mode = 'create' }) {
  const [formData, setFormData] = useState({
    title: '',
    event_type: '',
    event_subtype: '',
    segment: '',
    visibility_target: '',
    notes: '',
    proof_url: '',
  });

  const [strength, setStrength] = useState(0);
  const [subtypes, setSubtypes] = useState([]);

  useEffect(() => {
    if (mode === 'edit' && event) {
      setFormData(event);
      setStrength(event.strength || 0);
      if (event.event_type) {
        setSubtypes(getSubtypesForType(event.event_type));
      }
    } else {
      setFormData({
        title: '',
        event_type: '',
        event_subtype: '',
        segment: '',
        visibility_target: '',
        notes: '',
        proof_url: '',
      });
      setStrength(0);
      setSubtypes([]);
    }
  }, [isOpen, mode, event]);

  const handleEventTypeChange = (e) => {
    const newType = e.target.value;
    setFormData(prev => ({
      ...prev,
      event_type: newType,
      event_subtype: '',
    }));
    setSubtypes(getSubtypesForType(newType));
  };

  const handleSubtypeChange = (e) => {
    const newSubtype = e.target.value;
    setFormData(prev => ({
      ...prev,
      event_subtype: newSubtype,
    }));
    const newStrength = calculateStrength(formData.event_type, newSubtype);
    setStrength(newStrength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      strength,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-green-200">
        <div className="flex items-center justify-between p-6 border-b border-green-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Create Event' : 'Edit Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="What happened?"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Event Type *
              </label>
              <select
                name="event_type"
                value={formData.event_type}
                onChange={handleEventTypeChange}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900"
              >
                <option value="">Select type...</option>
                {ALL_EVENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Subtype *
              </label>
              <select
                name="event_subtype"
                value={formData.event_subtype}
                onChange={handleSubtypeChange}
                required
                disabled={subtypes.length === 0}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">Select subtype...</option>
                {subtypes.map(subtype => (
                  <option key={subtype} value={subtype}>{subtype}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Segment *
              </label>
              <select
                name="segment"
                value={formData.segment}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900"
              >
                <option value="">Select segment...</option>
                {SEGMENTS.map(seg => (
                  <option key={seg} value={seg}>{seg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Visibility *
              </label>
              <select
                name="visibility_target"
                value={formData.visibility_target}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900"
              >
                <option value="">Select visibility...</option>
                {VISIBILITY_OPTIONS.map(vis => (
                  <option key={vis} value={vis}>{vis}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Strength
              </label>
              <input
                type="text"
                value={strength}
                readOnly
                className="w-full px-4 py-2 border border-green-300 rounded-lg bg-gray-100 text-gray-900 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional details..."
              rows={3}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Proof URL
            </label>
            <input
              type="url"
              name="proof_url"
              value={formData.proof_url}
              onChange={handleChange}
              placeholder="Link to evidence..."
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900"
            />
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-gradient-to-r from-pink-400 to-green-400 text-white rounded-lg hover:from-pink-500 hover:to-green-500 font-semibold"
            >
              {mode === 'create' ? 'Create Event' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-green-300 text-gray-900 rounded-lg hover:bg-green-50 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

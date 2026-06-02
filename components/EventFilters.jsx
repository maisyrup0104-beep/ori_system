'use client';

import { Search, X } from 'lucide-react';
import { ALL_EVENT_TYPES, SEGMENTS, VISIBILITY_OPTIONS, getSubtypesForType } from '@/lib/eventConfig';
import { useState, useEffect } from 'react';

export default function EventFilters({ filters, onFiltersChange }) {
  const [subtypes, setSubtypes] = useState([]);

  useEffect(() => {
    if (filters.eventType) {
      setSubtypes(getSubtypesForType(filters.eventType));
    } else {
      setSubtypes([]);
    }
  }, [filters.eventType]);

  const handleChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      eventType: '',
      eventSubtype: '',
      segment: '',
      visibility: '',
      search: '',
      startDate: '',
      endDate: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(val => val);

  return (
    <div className="bg-gradient-to-br from-green-50 to-pink-50 border border-green-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-900 font-medium"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search title, notes..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select
          value={filters.eventType}
          onChange={(e) => {
            handleChange('eventType', e.target.value);
            handleChange('eventSubtype', '');
          }}
          className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900 text-sm"
        >
          <option value="">All Types</option>
          {ALL_EVENT_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={filters.eventSubtype}
          onChange={(e) => handleChange('eventSubtype', e.target.value)}
          disabled={subtypes.length === 0}
          className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900 text-sm disabled:bg-gray-100"
        >
          <option value="">All Subtypes</option>
          {subtypes.map(subtype => (
            <option key={subtype} value={subtype}>{subtype}</option>
          ))}
        </select>

        <select
          value={filters.segment}
          onChange={(e) => handleChange('segment', e.target.value)}
          className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900 text-sm"
        >
          <option value="">All Segments</option>
          {SEGMENTS.map(seg => (
            <option key={seg} value={seg}>{seg}</option>
          ))}
        </select>

        <select
          value={filters.visibility}
          onChange={(e) => handleChange('visibility', e.target.value)}
          className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900 text-sm"
        >
          <option value="">All Visibility</option>
          {VISIBILITY_OPTIONS.map(vis => (
            <option key={vis} value={vis}>{vis}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">From</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">To</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white text-gray-900 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

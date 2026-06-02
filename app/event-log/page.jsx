'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import SectionHeader from '@/components/SectionHeader';
import EventForm from '@/components/EventForm';
import EventDetailDrawer from '@/components/EventDetailDrawer';
import EventFilters from '@/components/EventFilters';
import EventTable from '@/components/EventTable';
import EventTimeline from '@/components/EventTimeline';
import ViewToggle from '@/components/ViewToggle';
import { eventsService } from '@/services/events';

export default function EventLogPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [activeView, setActiveView] = useState('table');
  const [filters, setFilters] = useState({
    eventType: '',
    eventSubtype: '',
    segment: '',
    visibility: '',
    search: '',
    startDate: '',
    endDate: '',
  });

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Apply filters whenever events or filters change
  useEffect(() => {
    applyFilters();
  }, [events, filters]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsService.getEvents();
      setEvents(data || []);
    } catch (error) {
      console.error('Failed to load events:', error);
      alert('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    // Convert date strings to Date objects for comparison
    let startDate = null;
    let endDate = null;
    if (filters.startDate) {
      startDate = new Date(filters.startDate);
      startDate.setHours(0, 0, 0, 0);
    }
    if (filters.endDate) {
      endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
    }

    filtered = filtered.filter(event => {
      // Type filter
      if (filters.eventType && event.event_type !== filters.eventType) return false;

      // Subtype filter
      if (filters.eventSubtype && event.event_subtype !== filters.eventSubtype) return false;

      // Segment filter
      if (filters.segment && event.segment !== filters.segment) return false;

      // Visibility filter
      if (filters.visibility && event.visibility_target !== filters.visibility) return false;

      // Date range filter
      if (startDate || endDate) {
        const eventDate = new Date(event.created_at);
        if (startDate && eventDate < startDate) return false;
        if (endDate && eventDate > endDate) return false;
      }

      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const searchableText = [
          event.title,
          event.notes,
          event.proof_url,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchableText.includes(search)) return false;
      }

      return true;
    });

    setFilteredEvents(filtered);
  };

  const handleCreateEvent = () => {
    setFormMode('create');
    setSelectedEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setFormMode('edit');
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === 'create') {
        await eventsService.createEvent(formData);
      } else {
        await eventsService.updateEvent(selectedEvent.id, formData);
      }
      setShowForm(false);
      loadEvents();
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await eventsService.deleteEvent(id);
      setShowDetailDrawer(false);
      loadEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const handleEventRowClick = (event) => {
    setSelectedEvent(event);
    setShowDetailDrawer(true);
  };

  return (
    <PageContainer
      title="Event Log"
      description="Track and log your revenue-building events, discoveries, and journey updates"
    >
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ViewToggle activeView={activeView} onViewChange={setActiveView} />
            <span className="text-sm font-semibold text-gray-600">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={handleCreateEvent}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-400 to-green-400 text-white rounded-lg hover:from-pink-500 hover:to-green-500 font-semibold shadow-md"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>

        {/* Filters */}
        <EventFilters filters={filters} onFiltersChange={setFilters} />

        {/* Events View */}
        {activeView === 'table' ? (
          <EventTable
            events={filteredEvents}
            onRowClick={handleEventRowClick}
            loading={loading}
          />
        ) : (
          <EventTimeline
            events={filteredEvents}
            onEventClick={handleEventRowClick}
            loading={loading}
          />
        )}
      </div>

      {/* Event Form Modal */}
      <EventForm
        isOpen={showForm}
        event={selectedEvent}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        mode={formMode}
      />

      {/* Event Detail Drawer */}
      <EventDetailDrawer
        isOpen={showDetailDrawer}
        event={selectedEvent}
        onClose={() => setShowDetailDrawer(false)}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </PageContainer>
  );
}

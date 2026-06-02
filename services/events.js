import { supabase } from '@/lib/supabase/client';
import { calculateStrength } from '@/lib/eventConfig';

export const eventsService = {
  async getEvents(filters = {}) {
    let query = supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.eventType) {
      query = query.eq('event_type', filters.eventType);
    }
    if (filters.eventSubtype) {
      query = query.eq('event_subtype', filters.eventSubtype);
    }
    if (filters.segment) {
      query = query.eq('segment', filters.segment);
    }
    if (filters.visibility) {
      query = query.eq('visibility_target', filters.visibility);
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,notes.ilike.%${filters.search}%,proof_url.ilike.%${filters.search}%`);
    }
    if (filters.startDate && filters.endDate) {
      query = query.gte('created_at', filters.startDate).lte('created_at', filters.endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    return data;
  },

  async getEventById(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      throw error;
    }

    return data;
  },

  async createEvent(eventData) {
    const strength = calculateStrength(eventData.event_type, eventData.event_subtype);

    const eventToCreate = {
      ...eventData,
      strength,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('events')
      .insert([eventToCreate])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }

    return data;
  },

  async updateEvent(id, updates) {
    // Recalculate strength if type or subtype changed
    let updatesWithStrength = { ...updates };
    if (updates.event_type || updates.event_subtype) {
      const existingEvent = await this.getEventById(id);
      const eventType = updates.event_type || existingEvent.event_type;
      const eventSubtype = updates.event_subtype || existingEvent.event_subtype;
      updatesWithStrength.strength = calculateStrength(eventType, eventSubtype);
    }

    const { data, error } = await supabase
      .from('events')
      .update(updatesWithStrength)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      throw error;
    }

    return data;
  },

  async deleteEvent(id) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Helper queries for dashboard
  async getRecentEvents(limit = 10) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getEventsThisWeek() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getEventsByType(eventType) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_type', eventType)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getConversationsThisWeek() {
    return this.getEvents({
      eventType: 'Conversation',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    });
  },

  async getDemsCompleted() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_type', 'Demo')
      .eq('event_subtype', 'Completed')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPositiveReplies() {
    return this.getEvents({
      eventType: 'Reply',
      eventSubtype: 'Positive',
    });
  },

  async getDiscoveries() {
    return this.getEventsByType('Discovery');
  },

  async getValidations() {
    return this.getEventsByType('Validation');
  },

  async countEventsByType(eventType) {
    const { data, error, count } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', eventType);

    if (error) throw error;
    return count;
  },
};

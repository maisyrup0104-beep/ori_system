import { supabase } from '@/lib/supabase/client';

export const personalStatesService = {
  async getPersonalStates() {
    const { data, error } = await supabase
      .from('personal_states')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching personal states:', error);
      throw error;
    }

    return data;
  },

  async createPersonalState(state) {
    const { data, error } = await supabase
      .from('personal_states')
      .insert([state])
      .select()
      .single();

    if (error) {
      console.error('Error creating personal state:', error);
      throw error;
    }

    return data;
  },

  async updatePersonalState(id, updates) {
    const { data, error } = await supabase
      .from('personal_states')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating personal state:', error);
      throw error;
    }

    return data;
  },

  async deletePersonalState(id) {
    const { error } = await supabase
      .from('personal_states')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting personal state:', error);
      throw error;
    }
  },
};

import { supabase } from '@/lib/supabase/client';

export const oriStatesService = {
  async getOriStates() {
    const { data, error } = await supabase
      .from('ori_states')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ori states:', error);
      throw error;
    }

    return data;
  },

  async createOriState(state) {
    const { data, error } = await supabase
      .from('ori_states')
      .insert([state])
      .select()
      .single();

    if (error) {
      console.error('Error creating ori state:', error);
      throw error;
    }

    return data;
  },

  async updateOriState(id, updates) {
    const { data, error } = await supabase
      .from('ori_states')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating ori state:', error);
      throw error;
    }

    return data;
  },

  async deleteOriState(id) {
    const { error } = await supabase
      .from('ori_states')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting ori state:', error);
      throw error;
    }
  },
};

import { supabase } from '@/lib/supabase/client';

export const settingsService = {
  async getSettings() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching settings:', error);
      throw error;
    }

    return data;
  },

  async updateSettings(updates) {
    const { data: existing } = await supabase
      .from('settings')
      .select('id')
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('settings')
        .update(updates)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating settings:', error);
        throw error;
      }

      return data;
    } else {
      const { data, error } = await supabase
        .from('settings')
        .insert([updates])
        .select()
        .single();

      if (error) {
        console.error('Error creating settings:', error);
        throw error;
      }

      return data;
    }
  },

  async createSettings(settings) {
    const { data, error } = await supabase
      .from('settings')
      .insert([settings])
      .select()
      .single();

    if (error) {
      console.error('Error creating settings:', error);
      throw error;
    }

    return data;
  },
};

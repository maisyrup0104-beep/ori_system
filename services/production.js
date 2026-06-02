import { supabase } from '@/lib/supabase/client';

export const productionService = {
  async getProductionItems() {
    const { data, error } = await supabase
      .from('production_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching production items:', error);
      throw error;
    }

    return data;
  },

  async createProductionItem(item) {
    const { data, error } = await supabase
      .from('production_items')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Error creating production item:', error);
      throw error;
    }

    return data;
  },

  async updateProductionItem(id, updates) {
    const { data, error } = await supabase
      .from('production_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating production item:', error);
      throw error;
    }

    return data;
  },

  async deleteProductionItem(id) {
    const { error } = await supabase
      .from('production_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting production item:', error);
      throw error;
    }
  },
};

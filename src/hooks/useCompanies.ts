import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Company } from '@/types';

export function useCompanies() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCompanies = async (): Promise<Company[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      return data as Company[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCompany = async (id: string): Promise<Company | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as Company;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (company: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('companies')
        .insert([company])
        .select()
        .single();
      
      if (error) throw error;
      
      return data as Company;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (id: string, updates: Partial<Company>): Promise<Company | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('companies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as Company;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
  };
}

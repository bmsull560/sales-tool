import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Persona } from '@/types';

export function usePersonas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPersonas = async (companyId?: string): Promise<Persona[]> => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('personas')
        .select('*')
        .order('name');
      
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data as Persona[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getPersona = async (id: string): Promise<Persona | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as Persona;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPersona = async (persona: Omit<Persona, 'id' | 'created_at' | 'updated_at'>): Promise<Persona | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('personas')
        .insert([persona])
        .select()
        .single();
      
      if (error) throw error;
      
      return data as Persona;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePersona = async (id: string, updates: Partial<Persona>): Promise<Persona | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('personas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as Persona;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePersona = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('personas')
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
    getPersonas,
    getPersona,
    createPersona,
    updatePersona,
    deletePersona
  };
}

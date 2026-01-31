"use client";

import { useState, useEffect } from 'react';
import { mockData } from './mockData';

export interface DreamData {
  totalDreams: number;
  topElements: Array<{ name: string; count: number; trend: 'up' | 'down' | 'stable' }>;
  topArchetypes: Array<{ name: string; count: number; description: string }>;
  latestDreams: Array<{ id: number; snippet: string; time: string; elements?: any }>;
  emotions: Record<string, number>;
  lastUpdated?: string;
}

export function useDreamData() {
  const [data, setData] = useState<DreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Failed to fetch data');
        const realData = await response.json();
        
        // Merge with mock data for any missing fields
        setData({
          totalDreams: realData.totalDreams || mockData.totalDreams,
          topElements: realData.topElements?.length > 0 
            ? realData.topElements 
            : mockData.topElements,
          topArchetypes: realData.topArchetypes?.length > 0 
            ? realData.topArchetypes 
            : mockData.topArchetypes,
          latestDreams: realData.latestDreams?.length > 0 
            ? realData.latestDreams 
            : mockData.latestDreams,
          emotions: Object.keys(realData.emotions || {}).length > 0 
            ? realData.emotions 
            : mockData.emotions,
          lastUpdated: realData.lastUpdated
        });
      } catch (err) {
        console.error('Error fetching dream data:', err);
        setError('Using demo data');
        // Fall back to mock data
        setData({
          totalDreams: mockData.totalDreams,
          topElements: mockData.topElements,
          topArchetypes: mockData.topArchetypes,
          latestDreams: mockData.latestDreams,
          emotions: mockData.emotions
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

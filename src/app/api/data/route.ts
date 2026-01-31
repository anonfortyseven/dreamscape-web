import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// For now, read from local files in public directory
// In production, this would connect to a database

export async function GET() {
  try {
    // Read aggregates from public folder
    const aggregatesPath = path.join(process.cwd(), 'public', 'data', 'aggregates.json');
    const processedPath = path.join(process.cwd(), 'public', 'data', 'processed.json');
    
    let aggregates = { total: 0, elements: {}, archetypes: {} };
    let processed: any[] = [];
    
    if (fs.existsSync(aggregatesPath)) {
      aggregates = JSON.parse(fs.readFileSync(aggregatesPath, 'utf-8'));
    }
    
    if (fs.existsSync(processedPath)) {
      processed = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
    }
    
    // Format data for frontend
    const topElements = Object.entries(aggregates.elements || {})
      .slice(0, 10)
      .map(([name, count]) => ({
        name,
        count: count as number,
        trend: 'stable' as const
      }));
    
    const topArchetypes = Object.entries(aggregates.archetypes || {})
      .slice(0, 8)
      .map(([name, count]) => ({
        name: name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        count: count as number,
        description: getArchetypeDescription(name)
      }));
    
    // Get latest dreams
    const latestDreams = processed
      .sort((a, b) => (b.created_utc || 0) - (a.created_utc || 0))
      .slice(0, 8)
      .map((d, i) => ({
        id: i + 1,
        snippet: getSnippet(d),
        time: getTimeAgo(d.created_utc),
        elements: d.elements
      }));
    
    // Calculate emotions
    const emotions: Record<string, number> = {};
    processed.forEach(d => {
      (d.elements?.emotions || []).forEach((e: string) => {
        const emotion = e.toLowerCase();
        emotions[emotion] = (emotions[emotion] || 0) + 1;
      });
    });
    
    return NextResponse.json({
      totalDreams: aggregates.total || processed.length,
      topElements,
      topArchetypes,
      latestDreams,
      emotions: Object.fromEntries(
        Object.entries(emotions).sort(([,a], [,b]) => b - a).slice(0, 5)
      ),
      lastUpdated: (aggregates as any).updated_at || new Date().toISOString()
    });
  } catch (error) {
    console.error('Error loading dream data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

function getArchetypeDescription(name: string): string {
  const descriptions: Record<string, string> = {
    'flying': 'Soaring through the sky with freedom and control',
    'house with hidden rooms': 'Discovering secret spaces in familiar places',
    'being chased': 'The classic pursuit dream - running from something unknown',
    'visitation from deceased': 'Encounters with loved ones who have passed',
    'lucid dreaming': 'Becoming aware within the dream state',
    'water/flood': 'Water representing emotions or overwhelming feelings',
    'lost': 'Wandering without direction or purpose',
    'loss of control': 'Unable to control actions or circumstances',
    'being trapped': 'Confined or unable to escape',
    'teeth falling out': 'Losing teeth - often linked to anxiety'
  };
  return descriptions[name.toLowerCase()] || 'A recurring dream pattern across humanity';
}

function getSnippet(dream: any): string {
  const themes = dream.elements?.themes || [];
  const actions = dream.elements?.actions || [];
  const places = dream.elements?.places || [];
  const parts = [...themes.slice(0, 2), ...actions.slice(0, 1), ...places.slice(0, 1)];
  return parts.length > 0 ? parts.join(', ') + '...' : 'A mysterious dream...';
}

function getTimeAgo(timestamp: number | undefined): string {
  if (!timestamp) return 'recently';
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

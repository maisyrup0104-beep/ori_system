'use client';

import { useEffect, useState } from 'react';
import { settingsService } from '@/services/settings';

export default function TopHeader() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 h-20 z-40">
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Revenue Goal</span>
            <span className="text-lg font-bold text-gray-900">
              {loading ? '—' : settings?.revenue_goal ? `$${settings.revenue_goal.toLocaleString()}` : '—'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Revenue Remaining</span>
            <span className="text-lg font-bold text-gray-900">
              {loading
                ? '—'
                : settings?.revenue_goal && settings?.current_revenue
                ? `$${(settings.revenue_goal - settings.current_revenue).toLocaleString()}`
                : '—'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Days Left</span>
            <span className="text-lg font-bold text-gray-900">
              {loading ? '—' : settings?.days_remaining || '—'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Current Focus</span>
            <span className="text-lg font-bold text-gray-900 truncate max-w-xs">
              {loading ? '—' : settings?.current_focus || '—'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

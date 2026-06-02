'use client';

import { useState, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { settingsService } from '@/services/settings';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    revenue_goal: '',
    current_revenue: '',
    days_remaining: '',
    current_focus: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        if (data) {
          setFormData({
            revenue_goal: data.revenue_goal || '',
            current_revenue: data.current_revenue || '',
            days_remaining: data.days_remaining || '',
            current_focus: data.current_focus || '',
          });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('revenue') || name.includes('days') ? Number(value) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await settingsService.updateSettings(formData);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer title="Settings">
        <div className="text-center py-12">Loading...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Settings" description="Configure your revenue sprint parameters">
      <div className="max-w-2xl">
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
          <div>
            <label htmlFor="revenue_goal" className="block text-sm font-medium text-gray-700 mb-2">
              Revenue Goal
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₱</span>
              <input
                type="number"
                id="revenue_goal"
                name="revenue_goal"
                value={formData.revenue_goal}
                onChange={handleChange}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="current_revenue" className="block text-sm font-medium text-gray-700 mb-2">
              Current Revenue
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₱</span>
              <input
                type="number"
                id="current_revenue"
                name="current_revenue"
                value={formData.current_revenue}
                onChange={handleChange}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="days_remaining" className="block text-sm font-medium text-gray-700 mb-2">
              Days Remaining
            </label>
            <input
              type="number"
              id="days_remaining"
              name="days_remaining"
              value={formData.days_remaining}
              onChange={handleChange}
              placeholder="18"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="current_focus" className="block text-sm font-medium text-gray-700 mb-2">
              Current Focus
            </label>
            <input
              type="text"
              id="current_focus"
              name="current_focus"
              value={formData.current_focus}
              onChange={handleChange}
              placeholder="What are you focused on right now?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import MetricCard from '@/components/MetricCard';
import SectionHeader from '@/components/SectionHeader';
import { settingsService } from '@/services/settings';
import { DollarSign, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
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

  const revenueRemaining =
    settings && settings.revenue_goal && settings.current_revenue
      ? settings.revenue_goal - settings.current_revenue
      : 0;

  return (
    <PageContainer title="Dashboard" description="Your 18-day revenue sprint at a glance">
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-8">
          <div>
            <SectionHeader title="Key Metrics" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <MetricCard
                label="Revenue Goal"
                value={settings?.revenue_goal ? `$${settings.revenue_goal.toLocaleString()}` : '—'}
                icon={DollarSign}
              />
              <MetricCard
                label="Current Revenue"
                value={settings?.current_revenue ? `$${settings.current_revenue.toLocaleString()}` : '—'}
                icon={TrendingUp}
              />
              <MetricCard
                label="Revenue Remaining"
                value={`$${revenueRemaining.toLocaleString()}`}
                icon={DollarSign}
              />
              <MetricCard
                label="Days Left"
                value={settings?.days_remaining || '—'}
                icon={CheckCircle}
              />
              <MetricCard
                label="Current Focus"
                value={settings?.current_focus || '—'}
                subtext="Primary objective"
              />
            </div>
          </div>

          <div>
            <SectionHeader title="Pipeline Overview" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                label="Prospects"
                value="—"
                subtext="Coming soon"
              />
              <MetricCard
                label="Clients"
                value="—"
                subtext="Coming soon"
              />
              <MetricCard
                label="Follow-Ups Due"
                value="—"
                subtext="Coming soon"
              />
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

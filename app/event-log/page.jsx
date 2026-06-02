'use client';

import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';

export default function EventLogPage() {
  return (
    <PageContainer
      title="Event Log"
      description="Track and manage your revenue-building events"
    >
      <EmptyState
        title="Event Log Coming Soon"
        description="Build your revenue through tracked events. This feature will be available in Batch 2."
      />
    </PageContainer>
  );
}

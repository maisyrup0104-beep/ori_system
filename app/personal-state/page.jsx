'use client';

import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';

export default function PersonalStatePage() {
  return (
    <PageContainer
      title="Personal State"
      description="Monitor your personal operating system metrics"
    >
      <EmptyState
        title="Personal State Coming Soon"
        description="Track your authority, trust, momentum, and authenticity. This feature will be available in Batch 2."
      />
    </PageContainer>
  );
}

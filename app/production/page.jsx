'use client';

import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';

export default function ProductionPage() {
  return (
    <PageContainer
      title="Production"
      description="Track deliverables and production tasks"
    >
      <EmptyState
        title="Production Coming Soon"
        description="Manage client deliverables and production items. This feature will be available in Batch 2."
      />
    </PageContainer>
  );
}

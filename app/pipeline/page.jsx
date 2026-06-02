'use client';

import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';

export default function PipelinePage() {
  return (
    <PageContainer
      title="Pipeline"
      description="View and manage your sales and revenue pipeline"
    >
      <EmptyState
        title="Pipeline Coming Soon"
        description="Track prospects, leads, and opportunities. This feature will be available in Batch 2."
      />
    </PageContainer>
  );
}

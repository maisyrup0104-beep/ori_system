'use client';

import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';

export default function OriStatePage() {
  return (
    <PageContainer
      title="Ori State"
      description="Track ORI's capability, credibility, proof, and relevance"
    >
      <EmptyState
        title="Ori State Coming Soon"
        description="Monitor the ORI operating system's core metrics. This feature will be available in Batch 2."
      />
    </PageContainer>
  );
}

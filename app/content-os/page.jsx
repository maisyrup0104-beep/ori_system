'use client';

import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';

export default function ContentOSPage() {
  return (
    <PageContainer
      title="Content OS"
      description="Manage your content strategy and creation"
    >
      <EmptyState
        title="Content OS Coming Soon"
        description="Build and manage your content operating system. This feature will be available in Batch 2."
      />
    </PageContainer>
  );
}

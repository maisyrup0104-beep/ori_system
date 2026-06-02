'use client';

import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';

export default function ClientsPage() {
  return (
    <PageContainer
      title="Clients"
      description="Manage your client relationships and contracts"
    >
      <EmptyState
        title="Clients Coming Soon"
        description="View and manage your client database. This feature will be available in Batch 2."
      />
    </PageContainer>
  );
}

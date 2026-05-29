// app/(example)/users/page.tsx
'use client';

import { OurCard } from '@/components/custom/our-card';
import DataTable from '@/components/custom/our-table';

import { UserRow } from '../type';
import { complaints } from '../_data/complaints';
import { complaintsColumns } from './complaint-columns';

export default function ComplaintTable() {
  return (
    <OurCard title="Table" size="fill">
      <DataTable<UserRow>
        data={complaints}
        columns={complaintsColumns}
        searchableKeys={['time']} // quick global search
        // defaultPageSize={10}
        // pageSizeOptions={[10, 25, 50]}
        enableRowSelection
        enableColumnVisibility
        enableExportCSV
        onRowClick={(row) => console.log('clicked:', row)}
      />
    </OurCard>
  );
}

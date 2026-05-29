'use client';
import ComplaintTable from './_components/complaint-table';

export default function Page() {
  return (
    <section className=" grid gap-4  md:grid-cols-1  w-full ">
      <ComplaintTable />
    </section>
  );
}

'use client';
import ApplyForm from '../../../components/ApplyForm';

export default function Apply({ params }: { params: { id: string } }) {
  return <ApplyForm jobId={params.id} />;
}
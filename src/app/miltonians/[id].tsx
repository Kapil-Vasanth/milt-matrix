// src/pages/miltonians/[id].tsx
import { useRouter } from 'next/router';

export default function MiltonianDetails() {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic route parameter

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Miltonian Details</h1>
      <p className="mt-4">You are viewing the details for Miltonian ID: {id}</p>
    </div>
  );
}

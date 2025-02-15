import { checkRole } from '@/utils/roles';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DisplayAdmin = async ({ role }: { role: 'admin' }) => {
  if (!(await checkRole(role))) return null;

  return (
    <div>
      <Link href="/admin">
        <Button variant="ghost">Admin</Button>
      </Link>
    </div>
  );
};

export default DisplayAdmin;

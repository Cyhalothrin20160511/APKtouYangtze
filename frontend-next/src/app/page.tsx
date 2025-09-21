import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function HomePage() {
  const hdr = await headers();
  const pathname = hdr.get('x-pathname') || '';

  if (pathname === '/') {
    redirect('/en');
  }

  return null;
}

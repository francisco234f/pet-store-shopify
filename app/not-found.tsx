import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container page-shell with-space">
      <h1>Page not found</h1>
      <Link href="/" className="primary-btn">Back to Petora</Link>
    </main>
  );
}

import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li><Link href="/hello">/hello</Link></li>
      <li><Link href="/hello-fetch">/hello-fetch</Link></li>
      <li><Link href="/hello-component">/hello-component</Link></li>
    </ul>
  );
}

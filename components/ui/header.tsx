'use client';
import Link from "next/link";

export default function Header() {
  return (
    <header className="sehat-header">
      <div className="container">
        <Link href="/" className="logo">
          Sehat Yar
        </Link>
        <nav className="nav">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <style jsx>{`
        .sehat-header {
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: var(--bg);
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-weight: 700;
        }
        .nav a {
          margin-left: 1rem;
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </header>
  );
}

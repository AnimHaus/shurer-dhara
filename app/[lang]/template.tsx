export default function Template({ children }: { children: React.ReactNode }) {
  // Scroll-to-top and transition are handled by PageTransitionProvider.
  // Template just mounts the page instantly so the overlay reveal looks correct.
  return <>{children}</>;
}

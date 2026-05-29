"use client";

import { usePageTransition } from "@/components/PageTransitionProvider";
import type { ComponentProps, MouseEvent } from "react";

type TransitionLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

/**
 * Drop-in replacement for Next.js <Link> that triggers the page
 * transition overlay before navigating.
 */
export default function TransitionLink({
  href,
  children,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let modifier-key clicks (new tab, etc.) behave normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    // Only intercept same-origin internal links
    if (href.startsWith("http") || href.startsWith("//") || href.startsWith("#")) return;
    e.preventDefault();
    onClick?.(e);
    navigate(href);
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

"use client";

import { useEffect } from "react";

export default function ViewTracker({ articleId }: { articleId: string }) {
  useEffect(() => {
    const key = `viewed_${articleId}`;
    // Only count once per session to avoid inflating on refresh
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_API_URL ??
      "http://localhost:8000";

    fetch(`${baseUrl}/api/news/${articleId}/view`, { method: "POST" }).catch(
      () => {} // silently ignore if backend is offline
    );
  }, [articleId]);

  return null;
}

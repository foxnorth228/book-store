import { Languages } from "@org/localization";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useLanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = useCallback((locale: Languages) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  }, []);

  return switchLocale;
}

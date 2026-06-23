import Link from "next/link";
import { clsx } from "clsx";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-brand-600 text-white hover:bg-brand-700"
          : "border border-slate-300 bg-white text-slate-900 hover:border-brand-600 hover:text-brand-700"
      )}
    >
      {children}
    </Link>
  );
}

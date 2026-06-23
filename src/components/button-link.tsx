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
        "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium shadow-sm transition-all duration-300 ease-out active:scale-[0.98]",
        variant === "primary"
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "border border-slate-200/60 bg-white text-slate-900 hover:bg-slate-50"
      )}
    >
      {children}
    </Link>
  );
}

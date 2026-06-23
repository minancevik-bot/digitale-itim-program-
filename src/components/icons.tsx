import {
  BadgeCheck,
  BookOpen,
  Boxes,
  CircleHelp,
  ClipboardList,
  Compass,
  Files,
  GraduationCap,
  Home,
  LifeBuoy,
  Map,
  MessagesSquare,
  Network,
  Puzzle,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

const icons = {
  BadgeCheck,
  BookOpen,
  Boxes,
  CircleHelp,
  ClipboardList,
  Compass,
  Files,
  GraduationCap,
  Home,
  LifeBuoy,
  Map,
  MessagesSquare,
  Network,
  Puzzle,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users
};

export function AppIcon({ name }: { name: string }) {
  const Icon = icons[name as keyof typeof icons] ?? ClipboardList;
  return <Icon aria-hidden className="h-5 w-5" />;
}

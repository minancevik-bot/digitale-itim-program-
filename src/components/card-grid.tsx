import { ModuleCard } from "@/components/module-card";
import type { ModuleCard as ModuleCardType } from "@/lib/types";

export function CardGrid({ cards }: { cards: ModuleCardType[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <ModuleCard key={card.title} card={card} />
      ))}
    </div>
  );
}

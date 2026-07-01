import { PackageOpen } from "lucide-react";
import IconInterface from "./iconInterface";

type Props = {
  message?: string;
};

// Estado vacío compartido.
export default function EmptyBoxInterface({ message = "No hay datos para mostrar." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 text-center text-ink-soft">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand/60">
        <IconInterface icon={PackageOpen} size="lg" />
      </span>
      <span className="text-base">{message}</span>
    </div>
  );
}

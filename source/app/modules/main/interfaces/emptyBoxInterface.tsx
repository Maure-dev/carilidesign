type Props = {
  message?: string;
};

// Estado vacío compartido.
export default function EmptyBoxInterface({ message = "No hay datos para mostrar." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-10 text-center text-dark-gray">
      <span className="text-base">{message}</span>
    </div>
  );
}

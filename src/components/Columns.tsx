import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

type Props = {
  children: React.ReactNode;
  id: string | number;
};

const Columns = ({ children, id }: Props) => {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  const style = isDropTarget ? { background: "#00000030" } : undefined;

  return (
    <div
      className="bg-neutral-600 w-full min-h-120 mt-8 rounded-sm flex flex-col gap-3 p-3"
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
};

export default Columns;

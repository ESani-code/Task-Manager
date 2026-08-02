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
      className="bg-accent-bg w-full bg-sidebar/80 min-h-30 h-fit mt-3 rounded-xl p-4 flex flex-col gap-3 justify-start items-center"
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
};

export default Columns;

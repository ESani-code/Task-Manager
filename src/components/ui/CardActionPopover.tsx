// import { useTaskStore } from "../../store/useTaskStore";
import { useState } from "react";
import EditModal from "../EditModal";
import { Button } from "./button";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Props = {
  id: string;

  title: string;
  description: string;
  content: string;
  footer: string;
  column: string | number;
};

const CardActionPopover = ({
  id,

  title,
  description,
  content,
  footer,
  column,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="secondary"
            className=" text-white/30 hover:text-white/80 items-center"
          >
            <i className="bi bi-three-dots" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-35">
          <div>
            {/* Edit Task Popover */}
            <div
              className="px-3 py-1 rounded-sm flex row items-center justify-between hover:bg-sidebar-accent"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="text-md">Edit</p>
              <i className="bi bi-pen text-md" />
            </div>
            <div className="px-3 py-1 text-destructive rounded-sm flex row items-center justify-between hover:bg-destructive/20">
              <p className="text-md">Delete Task</p>
              <i className="bi bi-trash3 text-md" />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task_id={id}
        task_title={title}
        task_description={description}
        task_content={content}
        task_footer={footer}
        task_column={column}
      />
    </>
  );
};

export default CardActionPopover;

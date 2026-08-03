import { Button } from "./button";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const CardActionPopover = () => {
  return (
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
          <div className="px-3 py-1 rounded-sm flex row items-center justify-between hover:bg-sidebar-accent">
            <p className="text-md">Edit</p>
            <i className="bi bi-pen text-md"></i>
          </div>
          <div className="px-3 py-1 text-destructive rounded-sm flex row items-center justify-between hover:bg-destructive/20">
            <p className="text-md">Delete Task</p>
            <i className="bi bi-trash3 text-md"></i>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CardActionPopover;

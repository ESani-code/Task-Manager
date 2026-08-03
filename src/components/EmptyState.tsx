const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 my-auto text-center text-white/30 border border-dashed border-white/10 rounded-lg w-full">
      <i className="bi bi-inbox text-2xl mb-1" />
      <p className="text-xs font-medium">No tasks in this column</p>
    </div>
  );
};

export default EmptyState;

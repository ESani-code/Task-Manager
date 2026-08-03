import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import TaskPage from "./pages/TaskPage";
import { Button } from "./components/ui/button";
import FilterTab from "./components/FilterTab";

function App() {
  return (
    <>
      <section className="flex flex-row justify-between px-2">
        <div className="">
          <FilterTab />
        </div>
        <Button className="bg-sidebar-foreground">
          <i className="bi bi-plus-circle" />
          <span>Create Task</span>
        </Button>
      </section>
      <section className="mx-2 flex items-center justify-center">
        <TaskPage />
      </section>
    </>
  );
}

export default App;

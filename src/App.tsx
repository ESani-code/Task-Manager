import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import TaskPage from "./pages/TaskPage";
import { Toaster } from "./components/ui/toast";

function App() {
  return (
    <>
      <TaskPage />
      <Toaster />
    </>
  );
}

export default App;

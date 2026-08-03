import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import TaskPage from "./pages/TaskPage";

import TaskTopBar from "./components/TaskTopBar";

function App() {
  return (
    <>
      <TaskTopBar />
      <section className="mx-2 flex items-center justify-center">
        <TaskPage />
      </section>
    </>
  );
}

export default App;

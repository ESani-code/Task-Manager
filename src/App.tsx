import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import TaskPage from "./pages/TaskPage";

import TaskTopBar from "./components/TaskTopBar";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState<string>("All Tasks");
  return (
    <>
      <TaskTopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className="mx-2 flex items-center justify-center">
        <TaskPage activeTab={activeTab} />
      </section>
    </>
  );
}

export default App;

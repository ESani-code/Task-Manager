import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TaskBox from "./components/TaskBox";

function App() {
  return (
    <>
      <section className="mx-4 flex items-center justify-center">
        <div className="w-full grid grid-cols-3 gap-4 justify-center items-center">
          {[...Array(6)].map(() => {
            return (
              <div className="flex items-center justify-center">
                <TaskBox />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;

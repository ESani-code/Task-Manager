import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TaskBox from "./components/TaskBox";

function App() {
  return (
    <>
      <section className="mx-4 flex items-center justify-center">
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
          {[...Array(9)].map((_, index) => {
            return (
              <div className="flex items-center justify-center">
                <TaskBox
                  title={`Task ${index + 1}`}
                  description="Card Description for the task yooooooo"
                  content="Card Content for the task at hand"
                  footer="Card Footer"
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;

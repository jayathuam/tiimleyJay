import { Suspense } from "react";
import "./App.css";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <>
      <div className="font-bold text-3xl text-blue-500 my-5">
        Employees System
      </div>
      <Suspense fallback={<div>Initial Loading....</div>}>
        <EmployeeList />
      </Suspense>
    </>
  );
}

export default App;

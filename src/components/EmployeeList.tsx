import { use } from "react";
import { employeePromise } from "../data";
import useEmployeeDetails from "../hooks/useEmployeeDetails";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList() {
  const employeeList = use(employeePromise);
  const {
    sortedAndFilteredEmployees,
    setSearchTerm,
    setSort,
    sort,
    sortOptions,
    departments,
    department,
    setDepartment
  } = useEmployeeDetails(employeeList);

  return (
    <>
      <div className="my-5 flex gap-10">
        <div>
          <span>Search:</span>
          <input
            name="searchText"
            type="text"
            className="w-100 border"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <span>Department:</span>
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            {departments.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span>Sort:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 content-start">
        {sortedAndFilteredEmployees.map((employee) => (
          <EmployeeCard employee={employee} />
        ))}
      </div>
    </>
  );
}

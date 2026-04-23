import { useEffect, useMemo, useState } from "react";
import type { Employee } from "../types";

const useEmployeeDetails = (employeeList: Employee[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("None");
  const [department, setDepartment] = useState<string>("");

  const sortOptions = ["None", "A-Z", "Z-A", "Newest", "Oldest"];

  const departments = useMemo(
    () => [
      "All",
      ...new Set(
        employeeList.reduce((acc: string[], current) => {
          acc.push(current.department);
          return acc;
        }, []),
      ),
    ],
    [employeeList],
  );

  const enrichedEmployeeDetails = useMemo(
    () =>
      employeeList.map((employee) => ({
        ...employee,
        avatar: employee.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase(),
      })),
    [employeeList],
  );

  // This is the most important logic do all the sorting and filtering
  // Do filter department first for improve the performance
  // finally the sort
  const sortedAndFilteredEmployees = useMemo(() => {
    const results = enrichedEmployeeDetails
      .filter((item) =>
        item.department.includes(department === "All" ? "" : department),
      )
      .filter(
        (item) =>
          item.name
            .toLocaleLowerCase()
            .includes(debounceSearchTerm.toLocaleLowerCase()) ||
          item.role
            .toLocaleLowerCase()
            .includes(debounceSearchTerm.toLocaleLowerCase()),
      )
      .sort((a, b) => {
        if (sort === "A-Z") {
          return a.name.localeCompare(b.name);
        }
        if (sort === "Z-A") {
          return b.name.localeCompare(a.name);
        }
        if (sort === "Newest") {
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        }
        if (sort === "Oldest") {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        }
        return 0;
      });
    return results;
  }, [debounceSearchTerm, department, enrichedEmployeeDetails, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return {
    employees: enrichedEmployeeDetails,
    sortOptions,
    departments,
    setSearchTerm,
    setSort,
    sort,
    setDepartment,
    department,
    sortedAndFilteredEmployees,
  };
};

export default useEmployeeDetails;

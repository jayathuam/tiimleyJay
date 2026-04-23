import { useMemo } from "react";
import type { Employee } from "../types";

export default function EmployeeCard(props: { employee: Employee }) {
  const { employee } = props;

  const statusColor = useMemo(() => {
    if (employee.status === "Active") {
      return "text-green-500";
    }
    if (employee.status === "On Leave") {
      return "text-red-500";
    }
    return "text-orange-500";
  }, [employee.status]);

  return (
    <div className="border p-4 h-full">
      <div>{employee.avatar}</div>
      <div>{employee.name}</div>
      <div>{employee.role}</div>
      <div>{employee.department}</div>
      <div>{employee.startDate.toString()}</div>
      <div>{employee.skills}</div>
      <div className={statusColor}>{employee.status}</div>
    </div>
  );
}

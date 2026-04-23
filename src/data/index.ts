import type { Employee } from "../types";

export const employeePromise: Promise<Employee[]> = fetch("data.json").then(
  (res) => res.json(),
);

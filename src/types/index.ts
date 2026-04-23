export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: "Active" | "On Leave" | "Probation";
  startDate: Date;
  skills: string[];
  avatar: string | null;
}

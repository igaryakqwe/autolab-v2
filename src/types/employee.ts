export interface Employee {
  id: string;
  image: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  role: string | null;
  isActive: boolean;
}

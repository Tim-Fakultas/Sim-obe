import UserTable from "@/components/UserTable";

export default function UserPage() {
  return <UserTable apiUrl="http://localhost:8000/api" />;
}

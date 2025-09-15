import DashboardComponent from "@/components/Dashboard";
import { DashboardData } from "@/lib/type";

export default async function DashboardPage() {
  // Fetch API dari Laravel
  const res = await fetch("http://localhost:8000/api/dashboard", {
    cache: "no-store",
  });
  const apiData = await res.json();

  const dashboardData: DashboardData = {
    userName: apiData.userName || "Luqman",
    cplData: apiData.cplData,
    plData: apiData.plData,
    bkData: apiData.bkData,
    subCpmkData: apiData.subCpmkData,
  };

  return <DashboardComponent {...dashboardData} />;
}

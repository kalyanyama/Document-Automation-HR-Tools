// REMOVE "use client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardCard from "@/components/cards/dashboard-card";
import { InteractiveAreaChartComponent } from "@/components/charts/area-charts/interactive";
import DataTable from "@/components/data-table";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-1 flex-col gap-6 space-y-4">
      <p>
        Welcome {session?.user?.email}! This is your protected dashboard
        content.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {Array.from({ length: 2 }).map((_, index) => (
          <DashboardCard key={index} />
        ))}
      </div>
      <InteractiveAreaChartComponent />
      <DataTable />
    </div>
  );
}

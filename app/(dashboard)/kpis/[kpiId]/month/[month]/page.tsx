export default function KPIMonthDetailPage({
  params,
}: {
  params: { kpiId: string; month: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        KPI Detail - {params.month}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          KPI ID: {params.kpiId}
        </p>
        <p className="text-gray-600">
          Month: {params.month}
        </p>
        <p className="text-gray-600 mt-4">KPI month detail placeholder</p>
      </div>
    </div>
  );
}

import TopNavbar from "@/components/admin/TopNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="pt-26 p-8">{children}</div>
    </div>
  );
}

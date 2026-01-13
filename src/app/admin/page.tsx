import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") redirect("/dashboard");

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Your role: {session.user.role}</p>
    </div>
  );
}

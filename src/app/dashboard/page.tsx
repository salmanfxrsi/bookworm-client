import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // ❌ Not logged in
  if (!session) {
    redirect("/auth/login");
  }

  // ✅ Logged in
  const user = session.user;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

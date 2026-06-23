import { redirectToDashboardForCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  await redirectToDashboardForCurrentUser();
}

import { Suspense } from "react";
import AuthCard from "@/admin/components/AuthCard";
import LoginForm from "@/admin/components/LoginForm";

export const metadata = { title: "Sign in · SDC INDIA Admin" };

export default function LoginPage() {
  return (
    <AuthCard
      title="Admin sign in"
      subtitle="Enter your admin email and password."
    >
      <Suspense fallback={<div className="text-center py-4 text-zinc-500 text-sm">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Page = async() => {
  await requireAuth();

  const data = await caller.getUsers();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected server component
      <div>
      {JSON.stringify(data)}
      </div>
      <LogoutButton/>
    </div>
  )
}

export default Page;
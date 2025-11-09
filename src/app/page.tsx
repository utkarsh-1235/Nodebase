"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Page = () => {
  // await requireAuth();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  // const data = await caller.getUsers();
  // const {data} = useQuery(trpc.getWorkflows.queryOptions())

  // const {create} = trpc.createWorkflows.useMutation({
  //   onSuccess: () => {
  //      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
  //   }
  // })
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected server component
      <div>
      {/* {JSON.stringify(data, null, 2)} */}
      </div>
      {/* <Button onClick={() => create.mutate()}>Create Workflows</Button> */}
      <LogoutButton/>
    </div>
  )
}

export default Page;



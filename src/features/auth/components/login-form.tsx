"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {authClient} from "@/lib/auth-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const loginFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async(values: LoginFormValues) => {
        console.log(values);
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/"
        },
    {
        onSuccess: () => {
            router.push('/');
        },
        onError: (ctx) => {
            toast.error(ctx.error.message);
        }
    })
}

const isPending = form.formState.isSubmitting;

return (
    <div className="flex flex-col items-center mt-6 gap-6">
   <Card className="w-1/2" >
    <CardHeader className="text-center">
        <CardTitle>
            Welcome back
        </CardTitle>
        <CardDescription>
            Login to continue
        </CardDescription>
    </CardHeader>
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
                 <div className="flex flex-col items-center gap-4">
                    <Button
                    variant="outline"
                    className="w-3/4 ml-4"
                    type="button"
                    disabled={isPending}>
                     Continue with GitHub
                    </Button>
                    <Button
                    variant="outline"
                    className="w-3/4 ml-4"
                    type="button"
                    disabled={isPending}>
                     Continue with Google
                    </Button>
                 </div>
                 <div className="ml-4 mr-4 grid gap-6">
                     <FormField
                     control={form.control}
                     name="email"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                type="email"
                                placeholder="m@example.com"
                                {...field}/>
                            </FormControl>
                        </FormItem>
                     )}/>
                     <FormField
                     control={form.control}
                     name="password"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                type="password"
                                placeholder="********"
                                {...field}/>
                            </FormControl>
                        </FormItem>
                     )}/>
                     <Button type="submit" className="w-full" disabled={isPending}>
                        Login
                     </Button>
                 </div>

                 <div className="text-center text-sm">
                     Don&apos;t have an account? {" "}
                     <Link href="/sign-up" className="unerline underline-offset-4">
                        Sign up
                     </Link>

                 </div>
            </div>
       </form>
     </Form>
    </Card>    
    </div>
)
}
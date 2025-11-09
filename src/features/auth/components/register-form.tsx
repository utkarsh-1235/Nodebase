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
import Image from "next/image";

const registerFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassowrd']
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
    const router = useRouter();
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword:""
        },
    });

    const onSubmit = async(values: RegisterFormValues) => {
        console.log(values);

        await authClient.signUp.email(
            {
            name: values.email.split('@')[0],
            email: values.email,
            password: values.password,
            callbackURL: "/"

    },
 {
    onSuccess: () => {
       router.push("/");
    },
    onError: (ctx) => {
       toast.error(ctx.error.message);
    }
 })
}

const isPending = form.formState.isSubmitting;

return (
    <div className="flex flex-col items-center gap-6">
   <Card className="w-full" >
    <CardHeader className="text-center">
        <CardTitle>
            Get started
        </CardTitle>
        <CardDescription>
            Create an account to get started
        </CardDescription>
    </CardHeader>
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
                 <div className="flex flex-col mx-auto items-center gap-4">
                    <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}>
                        <Image alt="GitHub" width={20} height={20}  src="./github.svg"/>
                     Continue with GitHub
                    </Button>
                    <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}>
                        <Image alt="Google" width={20} height={20}  src="./google.svg"/>
                     Continue with Google
                    </Button>
                 </div>
                 <div className="w-3/4 mx-auto grid gap-6">
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
                     <FormField
                     control={form.control}
                     name="confirmPassword"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                type="password"
                                placeholder="********"
                                {...field}/>
                            </FormControl>
                        </FormItem>
                     )}/>
                     <Button type="submit" className="w-full" disabled={isPending}>
                        Sign Up
                     </Button>
                 </div>

                 <div className="text-center text-sm">
                     Already have an account? {" "}
                     <Link href="/login" className="unerline underline-offset-4">
                        Login
                     </Link>

                 </div>
            </div>
       </form>
     </Form>
    </Card>    
    </div>
)
}
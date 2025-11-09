import { AuthLayout } from "@/features/auth/components/auth-layout";

const Layout = ({children}: {children: React.ReactNode;}) => {
    return (
        <div className="overflow-hidden mx-auto flex w-full max-w-md flex-col justify-center px-6 py-12 lg:py-8">
        <AuthLayout>
            {children}
        </AuthLayout>
        </div>
    )
}
export default Layout;
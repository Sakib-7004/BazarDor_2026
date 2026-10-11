import AuthForm from "@/components/AuthForm";
export default async function SignInPage({searchParams}:{searchParams:Promise<{callbackUrl?:string}>}){const {callbackUrl}=await searchParams;return <AuthForm mode="signin" callbackUrl={callbackUrl||"/"}/>}

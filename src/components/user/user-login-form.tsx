import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"
import BackButton from "../common/back-button"
import { GoogleLogin } from '@react-oauth/google';

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:4000/auth/login", form);
            if (res.data.success) {
                localStorage.setItem("token", res.data.data.token);
                alert(res.data.message || "Login Successful");
                navigate("/");
            } else {
                alert(res.data.message || "Login failed");
            }
        } catch (err: any) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <BackButton />
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="rishad@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </Field>
                            <Field>
                                <Button className="cursor-pointer" type="submit" disabled={isLoading}>
                                    {isLoading ? "Signing in..." : "Login"}
                                </Button>
                            </Field>

                            {/* google auth */}
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />

                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <a
                                    className="underline underline-offset-4 cursor-pointer"
                                    onClick={() => navigate("/register")}
                                >
                                    Sign up
                                </a>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Are You A Worker?{" "}
                                <a
                                    className="underline underline-offset-4 cursor-pointer"
                                // onClick={() => handleNav("/inspector/login")}
                                >
                                    Click Here
                                </a>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

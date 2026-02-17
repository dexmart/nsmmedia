import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const ADMIN_PASSWORD = "nsm2026admin"; // Simple password-based auth

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("nsm_admin", "true");
            navigate("/admin");
        } else {
            setError("Invalid password. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="container py-12 max-w-md">
                <div className="bg-card rounded-xl border border-border p-8">
                    <h1 className="font-display text-2xl uppercase text-center mb-2">Admin Login</h1>
                    <p className="text-xs text-muted-foreground text-center mb-6">Enter admin password to continue</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Enter admin password"
                            />
                        </div>
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AdminLogin;

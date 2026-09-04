"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral flex items-center justify-center px-6">
      <Link
        href="/"
        className="
    absolute
    top-6
    left-6
    flex
    items-center
    gap-2
    rounded-md
    bg-primary
    px-4
    py-2
    text-white
    hover:shadow-md
  "
      >
        <ArrowLeft size={18} />
        Beranda
      </Link>
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center mb-5">
              <Lock className="text-white" size={34} />
            </div>

            <h1 className="text-3xl font-bold text-primary">Login Pegawai</h1>

            <p className="text-gray-500 mt-3">
              Sistem Informasi Bapas Ciangir
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Masukkan email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border border-gray-200 pl-12 pr-4 outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border border-gray-200 pl-12 pr-14 outline-none focus:border-primary transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary hover:bg-[#0b2c7d] text-white rounded-2xl font-semibold transition-all disabled:opacity-70"
            >
              {loading ? "Loading..." : "Masuk"}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2026 Bapas Ciangir — Khusus Pegawai/Admin
        </p>
      </div>
    </div>
  );
}

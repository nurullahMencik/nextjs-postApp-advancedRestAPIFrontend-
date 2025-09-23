"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    router.push("/login");
  };

  return (
    <header className="w-full bg-amber-500 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Sol Logo */}
        <Link href={"/"} className="text-2xl font-bold text-white hover:opacity-90 transition">
          Anasayfa
        </Link>

        {/* Sağ Menü */}
        <nav className="flex items-center gap-4">
          {!user && (
            <>
              <Link
                href={"/login"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

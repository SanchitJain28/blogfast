"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  router.push("/");
  return <div>redirecting</div>;
}

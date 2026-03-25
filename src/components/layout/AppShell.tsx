"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { useProgress } from "@/hooks/useProgress";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { completionPercentage } = useProgress();

  return (
    <>
      <MobileHeader
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        completionPercentage={completionPercentage}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 lg:ml-72">
        <div className="px-4 py-6 lg:px-8 lg:py-8 pb-20 lg:pb-8">
          {children}
        </div>
      </main>
    </>
  );
}

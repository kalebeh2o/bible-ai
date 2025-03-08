"use client";

import { useAuth } from "@/providers/auth-provider";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <Card className="w-full border-0 h-screen flex justify-center items-center">
        <CardContent className="flex justify-center items-center p-12">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Carregando versículos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <div>{children}</div>;
};

export default DashboardLayout;

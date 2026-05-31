"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CurrencyInput from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import request from "@/utils/request";

type ProfileUser = {
  id: string;
  employee_number: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  join_date: string;
  salary: number;
  profile_uri?: string | null;
  department?: {
    id: string;
    name: string;
  } | null;
  position?: {
    id: string;
    name: string;
  } | null;
};

function formatDateOnly(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getInitials(name?: string) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProfileUser | null>(null);

  const imageBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await request.get("/auth/me");
      setData(res.data.data || null);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.errors?.message ||
          err?.response?.data?.message ||
          "Failed to fetch profile",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [fetchData]);

  if (!mounted) {
    return null;
  }

  const profileImageUrl = data?.profile_uri
    ? `${imageBaseUrl}/public/${data.profile_uri}`
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Detail of user profile data</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">
            Loading profile...
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label>Profile Image</Label>

              <div className="flex justify-between items-center gap-4 border p-4 rounded-md">
                <div className="flex gap-4 items-center">
                  <Avatar className="h-12 w-12 rounded-lg">
                    {profileImageUrl ? (
                      <AvatarImage
                        src={profileImageUrl}
                        className="object-cover"
                        alt={data?.full_name || "Profile image"}
                      />
                    ) : null}

                    <AvatarFallback>
                      {getInitials(data?.full_name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-sm">
                    <p className="font-medium">
                      {data?.full_name || "No profile data"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data?.email || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Employee Number</Label>
              <Input value={data?.employee_number || ""} readOnly />
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={data?.full_name || ""} readOnly />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input value={data?.email || ""} readOnly />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={data?.role || ""} readOnly />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Input value={data?.department?.name || ""} readOnly />
              </div>

              <div className="space-y-2">
                <Label>Position</Label>
                <Input value={data?.position?.name || ""} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Monthly Salary</Label>
              <CurrencyInput
                value={Number(data?.salary || 0)}
                onChange={() => {}}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label>Join Date</Label>
              <Input value={formatDateOnly(data?.join_date)} readOnly />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={data?.status || ""} readOnly />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

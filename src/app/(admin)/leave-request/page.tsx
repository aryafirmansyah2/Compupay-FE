"use client";

import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import request from "@/utils/request";
import { LeaveRequestTable } from "./components/leave-request-table";
import type {
  LeaveRequest,
  LeaveRequestDetailResponse,
  LeaveRequestPagination,
  LeaveRequestResponse,
  LeaveRequestStatus,
} from "./types";

export default function LeaveRequestPage() {
  const [data, setData] = useState<LeaveRequest[]>([]);
  const [pagination, setPagination] = useState<LeaveRequestPagination | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeaveRequestStatus | "">("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await request.get("/leaveRequest", {
        params: {
          page,
          limit,
          search,
          status,
        },
      });

      const response = res.data as LeaveRequestResponse;

      if (response.code !== 200) {
        toast.error(response.message || "Failed to fetch leave request", {
          duration: 2000,
          position: "top-right",
        });
        return;
      }

      setData(response.data || []);
      setPagination(response.pagination || null);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.message ||
        "Failed to fetch leave request";

      toast.error(message, {
        duration: 2000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, status]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchData]);

  const handleUpdateStatus = useCallback(
    async (id: string, nextStatus: "APPROVED" | "REJECT") => {
      const loadingToast = toast.loading(
        nextStatus === "APPROVED"
          ? "Approving leave request..."
          : "Rejecting leave request...",
        {
          position: "top-right",
        },
      );

      try {
        setUpdatingId(id);

        const res = await request.put(`/leaveRequest/${id}`, {
          status: nextStatus,
        });

        const response = res.data as LeaveRequestDetailResponse;

        if (response.code !== 200) {
          toast.error(response.message || "Failed to update leave request", {
            id: loadingToast,
            position: "top-right",
          });
          return;
        }

        toast.success(
          nextStatus === "APPROVED"
            ? "Leave request approved successfully"
            : "Leave request rejected successfully",
          {
            id: loadingToast,
            position: "top-right",
          },
        );

        fetchData();
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.errors?.message ||
          "Failed to update leave request";

        toast.error(message, {
          id: loadingToast,
          position: "top-right",
        });
      } finally {
        setUpdatingId(null);
      }
    },
    [fetchData],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: LeaveRequestStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  return (
    <section className="grid gap-4 md:grid-cols-3 w-full">
      <LeaveRequestTable
        data={data}
        isLoading={isLoading}
        updatingId={updatingId}
        search={search}
        status={status}
        pagination={pagination}
        page={page}
        limit={limit}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onUpdateStatus={handleUpdateStatus}
      />
    </section>
  );
}

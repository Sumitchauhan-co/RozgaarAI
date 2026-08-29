"use client";

import ApplicationContent from "@/app/features/applications/workers/components/ApplicationContent";
import ApplicationHeader from "@/app/features/applications/workers/components/ApplicationHeader";
import CreateWorkerApplication from "@/app/features/applications/workers/components/CreateWorkerApplication";
import { RecruiterApplicationItem } from "@/app/features/applications/workers/types";
import { useAuthStore } from "@/app/store/store";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApplicationsPage() {
  const router = useRouter();
  const { userId } = useAuthStore();
  const [applications, setApplications] = useState<RecruiterApplicationItem[]>(
    []
  );
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchApplications = useCallback(async (page: number) => {
    try {
      const response = await api.get(
        `/api/recruiter/application/paginated?page=${page}&pageSize=${itemsPerPage}`
      );
      const json = response.data;

      if (json.success) {
        setApplications(json.data?.applications || []);
        setTotalPages(json.data?.pagination?.totalPages || 0);
      }
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      toast.warning("Please log in to view worker applications.");
      router.replace("/login");
      return;
    }

    const loadApplications = async () => {
      await fetchApplications(currentPage);
    };

    void loadApplications();
  }, [userId, router, fetchApplications, currentPage]);

  const handleOpenCreateModal = () => {
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#FCF8F4]">
      <ApplicationHeader onOpenCreateModal={handleOpenCreateModal} />

      <ApplicationContent
        applications={applications}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateWorkerApplication
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
        onSuccess={() => fetchApplications(currentPage)}
      />
    </main>
  );
}

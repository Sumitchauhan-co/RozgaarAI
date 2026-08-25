"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { RecruiterApplicationContentProps } from "../types";

export default function ApplicationContent({
  applications,
  currentPage,
  totalPages,
  onPageChange,
}: RecruiterApplicationContentProps) {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="grid gap-6">
        {applications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <BriefcaseBusiness
              className="mx-auto mb-4 text-gray-300"
              size={48}
            />
            <p className="font-medium text-gray-500">
              No recruiter openings visible in your tracking space at the
              moment.
            </p>
          </div>
        ) : (
          <>
            {applications.map(app => (
              <div
                key={app.id}
                onClick={() =>
                  router.push(
                    `/applications/workers/${app.recruiterId}/${app.id}`
                  )
                }
                className="cursor-pointer rounded-3xl border border-orange-100/40 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5E7DA]">
                      <User className="text-[#8F3E13]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-[#2B0F05]">
                          {app.jobTitle}
                        </h2>
                        {app.employmentType && (
                          <span className="rounded-md bg-[#F5E7DA] px-2 py-0.5 text-xs font-semibold text-[#8F3E13]">
                            {app.employmentType}
                          </span>
                        )}
                        {app.experienceRequired !== null &&
                          app.experienceRequired !== undefined && (
                            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                              {app.experienceRequired} Yrs Exp Req.
                            </span>
                          )}
                      </div>

                      {/* Recruiter Name & Company */}
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm font-medium text-gray-600">
                        {(app.firstName || app.lastName) && (
                          <span className="flex items-center gap-1 text-[#8F3E13]">
                            <User size={14} />
                            {app.firstName} {app.lastName || ""}
                          </span>
                        )}
                        {app.firstName && app.companyName && (
                          <span className="text-gray-300">•</span>
                        )}
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Building2 size={16} className="text-gray-400" />
                          {app.companyName}
                        </span>
                      </div>

                      {app.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                          {app.description}
                        </p>
                      )}

                      {/* Skills Badges */}
                      {app.skills && app.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {app.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {app.locality ? `${app.locality}, ` : ""}
                          {app.city}, {app.country}
                        </span>
                        {app.industry && (
                          <span className="flex items-center gap-1">
                            <BriefcaseBusiness size={14} />
                            {app.industry}
                          </span>
                        )}
                        {app.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {app.phone}
                          </span>
                        )}
                        {app.salary && (
                          <span className="rounded bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#8F3E13] uppercase">
                            Salary: {app.salary.toLocaleString()} {app.currency}{" "}
                            / {app.payPeriod}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          onPageChange(Math.max(currentPage - 1, 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={currentPage === pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          onPageChange(Math.min(currentPage + 1, totalPages))
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

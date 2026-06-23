"use client";

import Link from "next/link";
import { BookOpen, Clock, Star, Award } from "lucide-react";
import { Course } from "@/lib/types";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="course-card group relative flex flex-col">
      {/* ── Image / thumbnail area ── */}
      <Link
        href={`/curso/${course.slug}`}
        className="relative block overflow-hidden rounded-t-[8px]"
      >
        <div className="relative aspect-video bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex h-full w-full items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105">
            <span className="text-3xl font-black uppercase tracking-tighter text-accent/20">
              {course.category}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {course.certificate && (
            <span className="badge badge-new px-2 py-0.5 text-[10px]">
              Certificado
            </span>
          )}
          <span
            className={`badge px-2 py-0.5 text-[10px] ${
              course.level === "Avançado"
                ? "badge-limited"
                : course.level === "Intermediário"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-green-100 text-green-800"
            }`}
          >
            {course.level}
          </span>
        </div>
      </Link>

      {/* ── Info area ── */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/curso/${course.slug}`}>
          <h3 className="line-clamp-2 text-sm font-bold leading-tight text-foreground transition-colors hover:text-accent">
            {course.name}
          </h3>
        </Link>

        {/* Instructor */}
        <p className="mt-1 text-xs text-muted">{course.instructor}</p>

        {/* Rating + Duration */}
        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
          <div className="flex items-center gap-0.5">
            <Star size={11} fill="#FF5F00" className="text-accent" />
            <span className="font-semibold text-foreground-mid">
              {course.rating}
            </span>
          </div>
          <span>·</span>
          <Clock size={11} />
          <span>{course.duration}</span>
        </div>

        {/* Students */}
        <p className="mt-1 text-xs text-muted">
          {course.students.toLocaleString("pt-BR")} alunos
        </p>

        {/* Modules */}
        {course.modules && course.modules.length > 0 && (
          <p className="mt-1 text-xs text-muted">
            {course.modules.length} módulos
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex-1">
          <p className="text-xl font-extrabold text-foreground">
            R$ {course.price.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-muted">à vista no Pix</p>
        </div>

        {/* CTA */}
        <Link
          href={`/curso/${course.slug}`}
          className="btn-primary mt-4 flex w-full items-center justify-center gap-2 py-3 text-xs"
        >
          <BookOpen size={14} />
          Ver curso
        </Link>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Clock, Users } from "lucide-react";
import { COURSES } from "@/lib/courses";

const TOP_COURSES = COURSES.slice(0, 6);

export default function CourseStrip() {
  return (
    <section className="border-b border-border bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/20">
            Cursos em destaque
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Course row — horizontal scroll on mobile */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible">
          {TOP_COURSES.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={`/curso/${course.slug}`}
                className="group flex w-[160px] flex-shrink-0 flex-col md:w-auto"
              >
                {/* Thumbnail */}
                <div className="relative mb-2 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
                  <div className="flex h-full w-full items-center justify-center p-3 transition-transform duration-500 group-hover:scale-105">
                    <span className="text-2xl font-black uppercase tracking-tighter text-accent/30">
                      {course.category}
                    </span>
                  </div>
                  {/* Badges */}
                  <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {course.certificate && (
                      <span className="badge px-2 py-0.5 text-[9px]">
                        Certificado
                      </span>
                    )}
                    {course.level === "Avançado" && (
                      <span className="badge-limited px-2 py-0.5 text-[9px]">
                        Avançado
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <h3 className="line-clamp-2 text-xs font-bold text-foreground group-hover:text-accent">
                  {course.name}
                </h3>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <Star size={10} fill="#FF5F00" className="text-accent" />
                  <span className="text-[10px] font-semibold text-muted">
                    {course.rating}
                  </span>
                  <span className="text-[10px] text-muted/50">·</span>
                  <Clock size={10} className="text-muted/50" />
                  <span className="text-[10px] text-muted">{course.duration}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-sm font-extrabold text-foreground">
                    R$ {course.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <span className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-success">
                  <Users size={10} />
                  {course.students.toLocaleString("pt-BR")} alunos
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-3 text-center">
          <Link
            href="/cursos"
            className="text-xs font-bold text-foreground underline underline-offset-4 hover:text-accent"
          >
            Ver todos os cursos →
          </Link>
        </div>
      </div>
    </section>
  );
}

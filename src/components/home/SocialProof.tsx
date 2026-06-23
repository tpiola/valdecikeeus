"use client";

import { Award } from "lucide-react";

const INSTRUCTORS = [
  {
    specialty: "Especialista em React e TypeScript",
    description:
      "Mais de 10 anos de experiência em desenvolvimento frontend. Criador de projetos open-source com milhares de estrelas no GitHub.",
    highlight: "4.9 ★ · 3.840 alunos",
  },
  {
    specialty: "Especialista em Python e Data Science",
    description:
      "Cientista de dados sênior com passagem por big techs. Já treinou mais de 5.000 profissionais em análise de dados e machine learning.",
    highlight: "4.9 ★ · 5.120 alunos",
  },
  {
    specialty: "Especialista em DevOps e Cloud",
    description:
      "Arquiteto de infraestrutura com certificações AWS, GCP e Azure. Experiência em migração de sistemas para escala global.",
    highlight: "4.8 ★ · 960 alunos",
  },
];

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Instrutores
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
          Aprenda com especialistas
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {INSTRUCTORS.map((instructor) => (
          <div
            key={instructor.specialty}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <div className="mb-3 flex gap-1 text-accent">
              <Award size={18} />
            </div>
            <p className="text-sm font-bold text-foreground">
              {instructor.specialty}
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              {instructor.description}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">
              {instructor.highlight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

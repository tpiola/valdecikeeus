import Script from "next/script";
import CourseStrip from "@/components/home/CourseStrip";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CourseGrid from "@/components/home/CourseGrid";
import SocialProof from "@/components/home/SocialProof";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import SummerDivider from "@/components/ui/SummerDivider";
import { COURSES, getFeaturedCourses, getNewCourses } from "@/lib/courses";
import { FAQ_ITEMS } from "@/lib/constants";

export default function Home() {
  const newCourses = getNewCourses().slice(0, 8);
  const featured = getFeaturedCourses();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const courseListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de Cursos",
    itemListElement: COURSES.slice(0, 6).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.name,
        description: c.description,
        image: `https://www.keeus.com.br${c.image}`,
        offers: {
          "@type": "Offer",
          price: c.price.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `https://www.keeus.com.br/curso/${c.slug}`,
        },
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="course-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd) }}
      />

      {/* Strip de cursos — montagem acima da hero */}
      <CourseStrip />

      {/* Hero com slider cinematográfico */}
      <Hero />

      {/* Barra de confiança */}
      <TrustBar />

      <SummerDivider />

      {/* Novos cursos */}
      <CourseGrid
        title="Novos Cursos"
        subtitle="Os cursos mais recentes da nossa plataforma"
        courses={newCourses}
        viewAllHref="/cursos?filtro=novos"
      />

      {/* Instrutores */}
      <SocialProof />

      <SummerDivider />

      {/* Mais populares */}
      <CourseGrid
        title="Mais Populares"
        subtitle="Os preferidos de quem já é aluno"
        courses={featured}
        viewAllHref="/cursos"
      />

      <SummerDivider />

      {/* Newsletter */}
      <LeadCapture />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}

import Link from "next/link";
import Container from "@/components/layout/Container";

export default function PositionsOpen({ sectionId, eyebrow, heading, intro, jobs = [] }) {
  return (
    <section id={sectionId} className="bg-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            {eyebrow ? <div className="text-slate-300 text-xl">{eyebrow}</div> : null}
            <h2 className="mt-2 text-4xl sm:text-5xl font-semibold text-slate-900 main-title">
              {heading}
            </h2>
          </div>

          {intro ? (
            <p className="text-slate-500 leading-relaxed lg:mt-10">{intro}</p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, idx) => (
            <div key={idx}>
              <div className="font-semibold text-slate-900">{job.title}</div>
              <p className="mt-3 leading-relaxed text-slate-500">{job.text}</p>

              {job.apply ? (
                <Link
                  href={job.apply.href}
                  className="mt-4 inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                >
                  {job.apply.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

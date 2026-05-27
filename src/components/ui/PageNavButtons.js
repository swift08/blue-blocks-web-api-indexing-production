import Link from "next/link";
import Container from "@/components/layout/Container";
import { normalizeSiteHref } from "@/lib/links";

export default function PageNavButtons({
  prev,
  next,
  bg = "bg-white"
}) {
  return (
    <section className={["bb-ui", bg].join(" ")}>
      <div className="bb-section">
        <div className="bb-section__inner">
          <Container>
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 sm:gap-6">

              {/* PREV BUTTON */}
              {prev?.href && prev?.label ? (
                <Link
                  href={normalizeSiteHref(prev.href)}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-all duration-300 hover:border-slate-900 hover:shadow-md"
                >
                    

                  <span className="mr-6 text-slate-400 transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                  <div>
                    {/* <p className="text-xs uppercase tracking-wide text-slate-400">
                      Previous
                    </p> */}
                    <p className="mt-1 text-base font-medium text-slate-900 transition-colors duration-300 group-hover:text-slate-700">
                      {prev.label}
                    </p>
                  </div>
                </Link>
              ) : <div />}

              {/* NEXT BUTTON */}
              {next?.href && next?.label ? (
                <Link
                  href={normalizeSiteHref(next.href)}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-all duration-300 hover:border-slate-900 hover:shadow-md"
                >
                  <div>
                    {/* <p className="text-xs uppercase tracking-wide text-slate-400">
                      Next
                    </p> */}
                    <p className="mt-1 text-base font-medium text-slate-900 transition-colors duration-300 group-hover:text-slate-700">
                      {next.label}
                    </p>
                  </div>

                  <span className="ml-6 text-slate-400 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ) : <div />}

            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

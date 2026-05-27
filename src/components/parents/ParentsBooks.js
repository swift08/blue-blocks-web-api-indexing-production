import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";

export default function ParentsBooks({ title, subtitle, items = [] }) {
  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-medium text-slate-900 whitespace-pre-line">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b, i) => (
            <div key={i} className="rounded-2xl bg-[#F3E3CF] p-5">
              <div className="">
                <Image
                  src={b.image}
                  alt={b.title || "Book"}
                  width={199}
                  height={250}
                  className="h-auto m-auto object-center"
                />
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium text-slate-900">{b.title}</div>
                {b.desc ? <p className="mt-2 text-xs text-slate-600">{b.desc}</p> : null}
                {b.cta ? (
                  <div className="mt-4 flex justify-end">
                  <Link href={b.cta.href} className="inline-flex text-xs text-[#2775F6] font-medium">
                    {b.cta.label}
                  </Link>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

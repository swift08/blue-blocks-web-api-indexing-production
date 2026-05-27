import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function InnovationCtaDrone({ title, text, cta, image }) {
  return (
    <section className="bg-white">
      <Container className="py-10 sm:py-14">
        <div className="relative rounded-3xl bg-[#1f3b82] text-white">
          <div className="p-8 sm:p-10">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-semibold whitespace-pre-line leading-tight">
                {title}
              </h3>
              {text ? <p className="mt-2 text-sm text-white/80">{text}</p> : null}

              {cta?.href ? (
                <Link
                  href={cta.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-[#1f3b82] hover:bg-white/90"
                >
                  {cta.label} <span className="ml-2" aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>

          {image ? (
            <div className="pointer-events-none absolute -right-4 -bottom-6 w-[190px] sm:w-[660px]">
              <Image src={image} alt="" width={920} height={620} className="h-auto w-full object-contain" />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

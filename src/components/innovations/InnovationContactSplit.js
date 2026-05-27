import Image from "next/image";
import Container from "@/components/layout/Container";

export default function InnovationContactSplit({ image, title, form }) {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-slate-100 aspect-[16/10] lg:h-full lg:aspect-auto">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full rounded-3xl bg-[#0f2d5c] p-7 sm:p-8 text-white">
              {title ? (
                <h3 className="text-xl sm:text-2xl font-semibold leading-tight">
                  {title}
                </h3>
              ) : null}

              <form className="mt-6 space-y-3">
                {(form?.fields || []).map((f) => {
                  if (f.type === "textarea") {
                    return (
                      <textarea
                        key={f.name}
                        name={f.name}
                        placeholder={f.placeholder}
                        rows={5}
                        className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none ring-1 ring-white/15 focus:ring-white/30"
                      />
                    );
                  }

                  return (
                    <input
                      key={f.name}
                      name={f.name}
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none ring-1 ring-white/15 focus:ring-white/30"
                    />
                  );
                })}

                <button
                  type="submit"
                  className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f2d5c] hover:bg-white/90"
                >
                  {form?.buttonLabel || "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

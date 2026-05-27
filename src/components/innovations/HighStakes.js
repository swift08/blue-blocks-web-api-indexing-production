import Image from "next/image";
import Container from "@/components/layout/Container";
import Link from "next/link";

export default function HighStakes({
  title,
  subheading,
  description,
  featureSections = [],
  droneImage,
  linkName,
  linkHref,
  gridNumber = "lg:grid-cols-3"
}) {
  return (
    <section className="bg-[#F5E9DA] py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Section: Title and Subheading */}
          <div className="lg:col-span-6">
            {subheading && (
              <div className="inline-flex rounded-full bg-[#2727E6]/15 px-6 py-2 text-xs font-semibold tracking-wider text-[#2C2F8F]">
                {subheading}
              </div>
            )}

            {title && (
              <h2 className="mt-4 text-3xl sm:text-[4rem] font-semibold leading-tight text-[#131313]">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-4 text-regular leading-tight text-[#131313]">
                {description}
              </p>
            )}
          </div>

          {/* Right Section: Drone Image */}
          <div className="lg:col-span-6">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
              <Image
                src={droneImage}
                alt="Drone Image"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </div>

        {/* Feature Sections */}
        <div className={`mt-12 grid gap-4 sm:grid-cols-1 ${gridNumber}`}>
          {featureSections.map((section, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#F5E1C7] p-6 flex flex-col justify-start"
            >
              {section.icon && (
                <div className="mb-4 text-[#2D9CDB]">
                  <Image
                    src={section.icon}
                    alt={section.title}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              )}

              <div className="text-[1.75] font-semibold text-[#333333]">
                {section.title}
              </div>
              {section.text && (
                <p className="mt-3 text-[1.25] text-[#414141] leading-relaxed">
                  {section.text}
                </p>
              )}
              {section.linkName && (
                <div className="Link-content mt-auto pt-3">
                    <Link className="text-[1.25] text-[#333333] leading-relaxed" href={section.linkHref}>{section.linkName}</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

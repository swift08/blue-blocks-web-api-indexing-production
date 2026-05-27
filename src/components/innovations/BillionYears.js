import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function BillionYears({
  eyebrow,
  title,
  subtitle,
  bulletPoints = [],
  hexImages1,
  hexImages2,
  hexImages3,
  footerText,
}) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-12">
            {title && (
              <h2 className="text-4xl sm:text-5xl font-semibold text-[#131313] main-title">
                {title}
              </h2>
            )}
          </div>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Section: Hexagonal Images */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-3 lg:grid-cols-3 w-[200] sm:w-full m-auto sm:m-0">
                <div
                  className="relative overflow-hidden absolute sm:top-40 sm:left-25"
                  style={{
                    height: "200px", // Set a height for the hexagons
                    width: "100%", // Ensure the width is 100% of the container
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagonal shape
                    backgroundColor: "#273C75", // Set a background color for the hexagon
                  }}
                >
                  <Image
                    src={hexImages1.src}
                    alt={hexImages1.alt || "Hexagonal Image"}
                    fill
                    className="object-cover"
                  />
                </div>
              
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "200px", // Set a height for the hexagons
                    width: "100%", // Ensure the width is 100% of the container
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagonal shape
                    backgroundColor: "#f3f4f6", // Set a background color for the hexagon
                  }}
                >
                  <Image
                    src={hexImages2.src}
                    alt={hexImages2.alt || "Hexagonal Image"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <button className="p-2 flex align-items-center justify-center w-[42] h-[42] bg-white rounded-full">
                      <span className="text-xl text-black">▶</span>
                    </button>
                  </div>
                </div>
                
                <div
                  className="relative overflow-hidden absolute sm:top-40 sm:right-25"
                  style={{
                    height: "200px", // Set a height for the hexagons
                    width: "100%", // Ensure the width is 100% of the container
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagonal shape
                    backgroundColor: "#f3f4f6", // Set a background color for the hexagon
                  }}
                >
                  <Image
                    src={hexImages3.src}
                    alt={hexImages3.alt || "Hexagonal Image"}
                    fill
                    className="object-cover"
                  />
                </div>
            </div>
          </div>

          {/* Right Section: Bullet Points */}
          <div className="lg:col-span-6">
            <div className="mt-8 space-y-6">
              {bulletPoints.map((point, idx) => (
                <div key={idx} className="flex sm:flex-col max-w-[100%] sm:max-w-[70%] gap-4">
                  <div className="flex-shrink-0 h-[54] w-[54] flex items-center justify-center text-[#2D9CDB]">
                    <Image
                      src={point.icon}
                      alt={point.title}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#333333]">
                      {point.title}
                    </div>
                    <p className="mt-2 text-lg text-[#6B6F7D] leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {footerText && (
          <div className="mt-12 p-6 bg-[#8BBF9F] rounded-xl font-medium">
            <p className="text-[1.4erm] text-[#FFFFFF]">{footerText}</p>
          </div>
        )}
      </Container>
    </section>
  );
}

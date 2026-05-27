import SectionRenderer from "@/lib/sectionRenderer";

export default function SectionRendererClient({ sections }) {
  return <SectionRenderer sections={Array.isArray(sections) ? sections : []} />;
}
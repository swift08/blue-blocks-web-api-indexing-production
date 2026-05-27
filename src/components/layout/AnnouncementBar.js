import Container from "./Container";

export default function AnnouncementBar({ leftText, rightText }) {
  return (
    <div className="bg-[#D97B58] text-white text-xs sm:text-sm">
      <Container className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="truncate">{leftText}</div>
        <div className="truncate sm:text-right opacity-90">{rightText}</div>
      </Container>
    </div>
  );
}

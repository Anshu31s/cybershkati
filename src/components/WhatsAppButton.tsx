export default function WhatsAppButton() {
  return (
    <a
      href="https://chat.whatsapp.com/ByIi6ZjVhVMAggg4XIE4WS?mode=wwt"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join the Cyber Shakti WhatsApp group"
      title="Join our WhatsApp group"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#00c853] text-white shadow-[0_0_24px_rgba(0,200,83,.45)] transition duration-200 hover:scale-110 hover:bg-[#00b94b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60"
    >
      <img src="/whatsapp.svg" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
    </a>
  );
}

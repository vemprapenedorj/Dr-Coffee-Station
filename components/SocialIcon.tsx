import Image from "next/image";

type SocialIconProps = {
  name: "instagram" | "whatsapp" | "location";
};

export function SocialIcon({ name }: SocialIconProps) {
  if (name === "instagram") {
    return (
      <Image
        src="/images/instagram-icon.jpg"
        alt="Instagram"
        width={32}
        height={32}
        className="social-icon-img social-icon-img--instagram"
        style={{ borderRadius: "8px", objectFit: "cover" }}
      />
    );
  }

  if (name === "whatsapp") {
    return (
      <Image
        src="/images/whatsapp-icon.jpg"
        alt="WhatsApp"
        width={32}
        height={32}
        className="social-icon-img social-icon-img--whatsapp"
        style={{ borderRadius: "8px", objectFit: "cover" }}
      />
    );
  }

  if (name === "location") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon social-icon--location">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  return null;
}

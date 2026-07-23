import Image from "next/image";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className={`brand-lockup${compact ? " brand-lockup--compact" : ""}`}>
      <Image
        className="brand-art"
        src="/images/brand/dr-coffee-logo-transparent.png"
        alt="Dr. Coffee — Especializado no seu café"
        width={490}
        height={272}
        priority={!compact}
      />
    </span>
  );
}

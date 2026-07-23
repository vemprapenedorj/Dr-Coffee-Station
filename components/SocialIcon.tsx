type SocialIconProps = {
  name: "instagram" | "whatsapp" | "location";
};

export function SocialIcon({ name }: SocialIconProps) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.5" cy="6.7" r="1" className="fill" />
      </svg>
    );
  }

  if (name === "location") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.4 5 15.8A8.4 8.4 0 1 1 20.5 11.6Z" />
      <path
        d="M9 7.9c.2-.5.5-.5.7-.5h.5c.2 0 .4.1.5.4l.9 2.1c.1.2.1.4 0 .6l-.6.7c-.1.1-.1.3 0 .4.5.9 1.2 1.6 2.1 2.1.1.1.3.1.4 0l.7-.6c.2-.1.4-.1.6 0l2.1.9c.3.1.4.3.4.5v.5c0 .2 0 .5-.5.7-.5.2-1.4.3-2.6-.2-1-.4-2.2-1.2-3.3-2.3-1.1-1.1-1.9-2.3-2.3-3.3-.5-1.2-.4-2.1-.2-2.6Z"
        className="fill"
      />
    </svg>
  );
}


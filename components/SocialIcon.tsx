type SocialIconProps = {
  name: "instagram" | "whatsapp" | "location";
};

export function SocialIcon({ name }: SocialIconProps) {
  if (name === "instagram") {
    return (
      <svg className="social-icon social-icon--instagram" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="120%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="28%" stopColor="#fa7e1e" />
            <stop offset="52%" stopColor="#d62976" />
            <stop offset="76%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </radialGradient>
        </defs>
        <rect x="1.5" y="1.5" width="21" height="21" rx="6" style={{ fill: "url(#instagram-gradient)", stroke: "none" }} />
        <rect x="5.3" y="5.3" width="13.4" height="13.4" rx="4" style={{ fill: "none", stroke: "#fff", strokeWidth: 1.6 }} />
        <circle cx="12" cy="12" r="3.2" style={{ fill: "none", stroke: "#fff", strokeWidth: 1.6 }} />
        <circle cx="17" cy="7" r="1" style={{ fill: "#fff", stroke: "none" }} />
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
    <svg className="social-icon social-icon--whatsapp" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" style={{ fill: "#25d366", stroke: "none" }} />
      <path d="M18.2 5.8A8.7 8.7 0 0 0 4.5 16.3L3.3 20.7l4.5-1.2A8.7 8.7 0 0 0 18.2 5.8Z" style={{ fill: "none", stroke: "#fff", strokeWidth: 1.25 }} />
      <path
        d="M9 7.9c.2-.5.5-.5.7-.5h.5c.2 0 .4.1.5.4l.9 2.1c.1.2.1.4 0 .6l-.6.7c-.1.1-.1.3 0 .4.5.9 1.2 1.6 2.1 2.1.1.1.3.1.4 0l.7-.6c.2-.1.4-.1.6 0l2.1.9c.3.1.4.3.4.5v.5c0 .2 0 .5-.5.7-.5.2-1.4.3-2.6-.2-1-.4-2.2-1.2-3.3-2.3-1.1-1.1-1.9-2.3-2.3-3.3-.5-1.2-.4-2.1-.2-2.6Z"
        style={{ fill: "#fff", stroke: "none" }}
      />
    </svg>
  );
}

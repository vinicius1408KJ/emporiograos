import { social } from "@/config/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./BrandIcons";

const items = [
  { key: "instagram", label: "Instagram", href: social.instagram, Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", href: social.facebook, Icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", href: social.tiktok, Icon: TikTokIcon },
] as const;

export const activeSocial = items.filter((i) => i.href);

/** Só mostra as redes preenchidas em config/site.ts. */
export function SocialLinks({ className = "", itemClass = "" }: { className?: string; itemClass?: string }) {
  if (activeSocial.length === 0) return null;
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {activeSocial.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`grid size-11 place-items-center rounded-full transition hover:bg-cream/10 hover:text-lime ${itemClass}`}>
            <Icon className="size-[1.15rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

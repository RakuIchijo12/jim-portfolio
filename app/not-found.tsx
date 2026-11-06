import Link from "next/link";
import { LogoMark } from "@/app/components/ui/glyphs";

export const metadata = {
  title: "404 | Jimuel Dave Rodado",
};

/** A missing route, answered the way a shell would. */
export default function NotFound() {
  return (
    <main className="lost">
      <div className="lost__box win">
        <div className="win__bar">
          <span aria-hidden="true" className="win__lights">
            <i />
            <i />
            <i />
          </span>
          <span className="win__title">jimuel@portfolio: ~</span>
        </div>
        <div className="win__body">
          <LogoMark className="lost__mark" />
          <p className="lost__code">404</p>
          <p className="lost__line">
            <span className="text-accent">$</span> cd ./this-page
          </p>
          <p className="lost__line lost__line--err">cd: no such file or directory</p>
          <p className="lost__copy t-pretty">
            The page you asked for does not exist, or it moved. The portfolio is one command away.
          </p>
          <Link href="/" className="btn btn--primary">
            cd ~
          </Link>
        </div>
      </div>
    </main>
  );
}

import footer from "@/public/images/footer/footer.png";
import Image from "next/image";
import Logo from "@/public/images/layout/logo-white.png";
import Reclamacoes from "@/public/images/footer/reclamacoes.png";
import clsx from "clsx";
import GoogleIcon from "@/public/images/footer/google.png";
import FacebookIcon from "@/public/images/footer/facebook.png";
import InstagramIcon from "@/public/images/footer/instagram.png";
import TripadvisorIcon from "@/public/images/footer/tripadvisor.png";
import { LanguagesType } from "@/types/types";
import Pt2020 from "@/public/images/footer/2020.png";
import Rnt from "@/public/images/footer/rnt.png";
import VisitPortugal from "@/public/images/footer/visitportugal.png";

const Footer = ({
  lang,
  rights,
  terms,
  privacy,
}: {
  lang: LanguagesType;
  rights: string;
  terms: string;
  privacy: string;
}) => {
  return (
    <footer className="relative h-[450px]">
      <Image
        className={clsx(
          "absolute top-0 -z-10 w-full object-cover",
          "blur-[1px] brightness-50 filter",
        )}
        src={footer}
        alt="Logo"
        fill
      />
      <div className="relative z-30 flex h-full w-full items-end justify-between">
        {/* left */}
        <section className="w-1/2">
          <Image src={Logo} alt="Logo" className="z-30 w-48 p-2 px-8" />
          <Image
            src={Reclamacoes}
            alt="Reclamacoes"
            className="z-30 w-48 p-2 px-8"
          />
          <div className="z-30 w-48 p-2 px-8 text-left text-xs text-white">
            {rights}
          </div>
          <div className="z-30 w-48 p-2 px-8 text-left text-xs text-white">
            Silêncio místico unipessoal, lda NIPC 516015877 Casas da ribeira
            n°107, 8300-023 Silves Licence RNAAT n°245/2022
          </div>
        </section>
        {/* right */}
        <section className="flex w-1/2 flex-col items-end justify-end text-end">
          {/* socials */}
          <div className="z-40 flex w-48 items-center justify-end space-x-2 p-2 px-8">
            <a href="https://www.facebook.com/AlgarvianRoots/" target="_blank">
              <Image src={FacebookIcon} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/algarvianroots/" target="_blank">
              <Image src={InstagramIcon} alt="Instagram" />
            </a>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g189122-d23985619-Reviews-AlgarvianRoots-Silves_Faro_District_Algarve.html"
              target="_blank" 
            >
              <Image
                src={TripadvisorIcon}
                alt="Tripadvisor"
                className="w-full"
              />
            </a>
            <a
              href="https://www.google.com/search?q=algarvianroots&oq=algarvianroots&aqs=chrome.1.69i60j69i59j0i546l3j69i60l3.8158j0j7&sourceid=chrome&ie=UTF-8"
              target="_blank"
            >
              <Image src={GoogleIcon} alt="Google" />
            </a>
          </div>
          <div className="z-30 flex w-12 items-center justify-end space-x-2 p-2 px-8">
            <a href="mailto:info@algarvianroots.com" className="text-white">
              info@algarvianroots.com
            </a>
          </div>
          <div className="z-30 flex items-center justify-end space-x-2 p-2 px-8">
            <a
              href={`/docs/terms-${lang}-2022.pdf`}
              target="_blank"
              className="text-white"
            >
              {terms}
            </a>
          </div>
          <div className="z-30 flex items-center justify-end space-x-2 p-2 px-8">
            <a
              href={`/docs/privacy-${lang}-2022.pdf`}
              target="_blank"
              className="text-white"
            >
              {privacy}
            </a>
          </div>
          <div className="z-30 flex w-full flex-wrap items-center justify-end gap-2 px-8 space-x-2 p-2">
            <a
              href="https://rnt.turismodeportugal.pt/rnt/Pesquisa_AAT.aspx?FiltroVisivel=True"
              target="_blank"
            >
              <Image src={Rnt} className="w-24" alt="Rnt" />
            </a>
            <a
              href="https://visitalgarve.pt/equipamento/5671/algarvianroots"
              target="_blank"
            >
              <Image src={VisitPortugal} className="w-24" alt="VisitPortugal" />
            </a>
          </div>
          <div className="z-30 flex w-48 items-center justify-end space-x-2 p-2 px-8 sm:w-80">
            <a href={`/docs/2020.pdf`} target="_blank" className="text-white">
              <Image src={Pt2020} alt="Pt2020" />
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

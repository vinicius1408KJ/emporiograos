import { redirect } from "next/navigation";
import { HOME } from "@/config/site";

/** /lojas não tem página própria: leva para a seção de lojas do site. */
export default function StoresIndex() {
  redirect(`${HOME}#lojas`);
}

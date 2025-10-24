import type { Route } from "./+types/home";
import { isoService } from "../services/iso/iso.service";
import type { IsoMetadata } from "~/models";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default async function Home() {
  const protocol = "retro://launch/";

  return (
    <div>
      {isoService.isoWithEmulatorList.map((file: Partial<IsoMetadata>) => (
        file?.emulator?.length ?
          <p><a key={file.title} href={protocol + file.emulator + '/' + file.title} target="_blank">{file.title}</a></p>
          :
          <p key={file.title}>{file.title} (No associated emulator)</p>
      ))}
    </div>
  );
}

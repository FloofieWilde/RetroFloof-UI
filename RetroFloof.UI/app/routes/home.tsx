import type { Route } from "./+types/home";
import { isoService } from "../services/iso/iso.service";
import type { IsoMetadata } from "~/models";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Retrofloof Alpha" },
    { name: "description", content: "Welcome to your future emulation software!" },
  ];
}

export default async function Home() {
  const protocol = "retro://launch/";

  // TODO : Handle Full Path properly
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

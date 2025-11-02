import type { Route } from "./+types/home";
import { isoService } from "../services/iso/iso.service";
import type { IsoMetadata } from "~/models";
import { Link } from "react-router";
import { CgProfile } from "react-icons/cg";

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
      <Link to='/profile' style={{ fontWeight: "bold", position: 'absolute', right: '10px', top: '10px', fontSize: '2.5rem' }}><CgProfile /></Link>
      <h1>Welcome to Retrofloof Alpha</h1>
      <p>&nbsp;</p>
      <h2>Available ISOs with Emulators :</h2>
      {isoService.isoWithEmulatorList.map((file: Partial<IsoMetadata>) => (
        file?.emulator?.length ?
          <p><a key={file.title} href={protocol + file.emulator + '/' + file.fullPath} target="_blank">{file.title}</a></p>
          :
          <p key={file.title}>{file.title} (No associated emulator)</p>
      ))}
    </div>
  );
}

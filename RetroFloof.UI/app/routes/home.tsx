import fs from 'fs';
import type { Route } from "./+types/home";
import { json } from 'stream/consumers';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export async function loader() {
  const folder = process.env.VITE_RETROARCHISOFOLDER!;
  const files = fs.readdirSync(folder);
  return files;
}

export default async function Home() {
  const protocol = "retro://launch/";
  const emulator = "ppsspp/";
  const folder = import.meta.env.VITE_RETROARCHISOFOLDER;
  const filelist = await loader();
  console.log("env", import.meta.env.VITE_RETROARCHISOFOLDER);
  console.log("filelist", filelist);
  return (
    <div>
      {filelist.map((file: string) => (
        <p><a key={file} href={protocol + emulator + file}>{file}</a></p>
      ))}
    </div>
  );
}

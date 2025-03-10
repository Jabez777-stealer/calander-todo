import Image from "next/image";
import FullCalander from "../../components/calanderComponent";

export default function Home() {
  return (
    <div className="p-5 font-[family-name:var(--font-geist-sans)]">
    <FullCalander/>
    </div>
  );
}

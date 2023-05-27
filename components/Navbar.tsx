import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="py-6 flex items-center">
      <Image
        width={48}
        height={48}
        className="w-12 h-12"
        src="/logo_uonvj.jpg"
        alt="logo-upn"
      />
      {/* <ul className="flex gap-2 ml-6">
        <li>Home</li>
        <li>Predict</li>
      </ul> */}
    </nav>
  );
}

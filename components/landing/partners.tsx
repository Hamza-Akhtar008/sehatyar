import Image from "next/image";

export default function Partners() {
  return (
    <div className="py-40 px-20 text-center">
        <h1 className="text-[42px]">Our <span className="text-green-500">Partners</span></h1>
        <Image
          src="/images/partners.svg"
          alt="Partner Logo"
          width={300}
          height={300}
          className="mx-auto mt-15 w-646"
        />
    </div>
  )
}

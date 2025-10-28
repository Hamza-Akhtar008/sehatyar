import Image from "next/image";

export default function Partners() {
  return (
    <div className="py-10 md:py-53 px-20 text-center">
        <h1 className="text-4xl">Our <span className="text-green-500 text-4xl">Partners</span></h1>
        <Image
          src="/images/partners.svg"
          alt="Partner Logo"
          width={300}
          height={300}
          className="mx-auto mt-5 md:mt-15 w-646"
        />
    </div>
  )
}

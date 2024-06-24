import { ubuntu } from './fonts'
import Image from 'next/image';

export default function ZebracornsLogo() {
  return (
    <div
      className={`${ubuntu.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/Logo-Mono.png"
        width={12}
        height={12}
        className="h-12 w-12"
        alt="Zebracorns Logo"
      />
    </div>
  );
}
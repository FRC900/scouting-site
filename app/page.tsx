import { Welcome } from "../components/Welcome/Welcome";
// import { useSession } from 'next-auth/react'

export default function HomePage() {
  // const { data: session } = useSession()

  return (
    <>
      <Welcome />
    </>
  );
}

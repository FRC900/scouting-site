import { Welcome } from "../components/Welcome/Welcome";
import Dashboard from "../components/Dashboard/Dashboard";
import { useSession } from 'next-auth/react'

export default function HomePage() {
  // const { data: session } = useSession()

  return (
    <>
      {false ? <Dashboard/> : <Welcome/>}
    </>
  );
}

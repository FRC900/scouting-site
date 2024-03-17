import PitForm from "@/app/ui/scouting/pit-form";
import { fetchTeams } from "@/app/lib/data";


export default async function Page() {
  const teams = await fetchTeams();
  
  return (
    <div>
      <PitForm teams={teams} />
    </div>
  )
}
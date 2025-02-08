import { fetchStandForms } from '../../lib/data';

export default async function Page() {
    const standForms = await fetchStandForms();

    return (
       <>
         
       </>
    )
}
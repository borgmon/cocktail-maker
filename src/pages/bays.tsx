import { PlusButton } from "@/components/plusButton";
import { useRouter } from "next/router";
import useFetchBays, { DelBay } from "@/hooks/useFetchBays";

export default function BaysPage() {
  const bays = useFetchBays()
  const router = useRouter()

  const delBay = (id: number) =>{
    DelBay(id).then(()=>router.reload())
  }

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Bay#</th>
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bays.bays.sort((a,b)=>a.id-b.id).map((bay, i) => (
              <tr key={i}>
                <td>{bay.id}</td>
                <td>{bay.ingredient}</td>
                <td>
                <button className="btn btn-error" onClick={()=>delBay(bay.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PlusButton callback={()=>{router.push("/new-bay")}}></PlusButton>

    </div>
  );
}

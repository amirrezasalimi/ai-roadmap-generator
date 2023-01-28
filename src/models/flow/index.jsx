import { useRouter } from "next/router";

const Flow = () => {

  const { query} = useRouter();
  console.log(query.id);

  return(
    <div>
      flow 
    </div>
  )
};
export default Flow;

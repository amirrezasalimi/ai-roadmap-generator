import { useRouter } from "next/router";

const DrawFlow = () => {

  const { query} = useRouter();
  console.log(query.id);

  return(
    <div>
      flow 
    </div>
  )
};
export default DrawFlow;

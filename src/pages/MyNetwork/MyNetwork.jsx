import useAllUser from "../../hooks/useAllUser";
import PersonCard from "./PersonCard";

export default function MyNetwork() {
   const [users] = useAllUser();
   console.log('all users ===>>>>>',users);

  return (
    <div className="flex my-2 gap-1">
    <div className="w-1/4">
        <h1 className="text-4xl">left compoo 25%</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus laboriosam, dignissimos officiis quis, minima minus autem illum illo, fuga ducimus assumenda recusandae eum ipsum ad a aut inventore deserunt? Tempore ratione odio, laborum quibusdam repellendus doloremque beatae nostrum illo fuga adipisci aliquid corrupti ex eius eveniet harum sit maiores temporibus voluptatum! Perspiciatis quod sed maxime illum, in incidunt officia voluptatibus reprehenderit ullam ea modi dolores delectus, voluptates, quo dicta. Sed, debitis ad earum asperiores, fugiat quos perferendis excepturi nesciunt aspernatur tempora beatae magni cumque vero quae qui non assumenda provident natus animi repellat eius. Repellat sequi culpa sint quasi qui.</p>
    </div>
    
         <div className="w-3/4  flex flex-wrap  gap-3 m-auto ">
          {users?.map(user => (
               <PersonCard
                  key={user._id} 
                  userCard={user}
               />
            ))}
           
         </div>
</div>

  )
}

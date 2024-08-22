import { NavLink } from "react-router-dom";

function Home (){
    // const navigate=useNavigate();
    return (
        <div>
            <NavLink to="/form" >
                <button  className="h-fit w-fit px-4 py-1 bg-zinc-800 text-white rounded m-2 hover:bg-zinc-700 transition duration-150"
                >Click me to go home</button>
            </NavLink>
        </div>
    )
}


export default Home;
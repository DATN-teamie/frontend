import teamie_logo  from "../assets/teamie_logo.png";

export default function TopBar() {
  return (
    <div className="absolute inset-x-0 top-0 h-16 text-white bg-slate-600 text-xl px-5 flex">
      <div className="space-x-8 flex items-center">
        <a href="#" className="text-slate-300 flex items-center text-2xl hover:bg-slate-700 px-3 my-2 mb-3 rounded-md">
            <img src={teamie_logo} alt="teamie_logo" className="size-14"/>
          Teamie
        </a>
        <div className="hover:bg-slate-700 px-3 my-2 mb-3 rounded-md p-3">
        <a href="#" className="">
          Workspaces
        </a>
        </div>
     
        <button href="#" className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
           className="size-6"
          >
            <path d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

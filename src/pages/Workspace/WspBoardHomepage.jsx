import { useStore } from "../../hook/useStore";

export default function WspBoardHomepage() {
    const currentWorkspace = useStore((state) => state.currentWorkspace);
    return <h1>{currentWorkspace.name}</h1>

}
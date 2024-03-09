import dynamic from "next/dynamic";
const GuessInfoPage = dynamic(() => import("./components/GuessInfo"));

export default GuessInfoPage;

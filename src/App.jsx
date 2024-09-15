import { useState, useEffect } from "react";
// import { useUserStore } from "./lib/userStore.js";
import Terminal from "./pages/Terminal.jsx";

function App() {

	// const { fetchUser } = useUserStore();

	// useEffect(() => {
	// 	// fetchUser();
	// 	// fetchNull();
	// }, []);

	const [isInTerminal, setIsInTerminal] = useState(true);
	
	if (isInTerminal) return <Terminal />; //Login page
	return <div>Main</div>; //Main
}

export default App;


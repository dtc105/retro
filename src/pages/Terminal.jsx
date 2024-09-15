import { useEffect, useState, useRef } from "react";
import { useUserStore } from "../lib/userStore.js";


function Terminal() {

    const commands = {
        "help, ?": "view this screen",
        "login": "login to an existing account",
        "register": "register a new account",
        "retry": "attempt to fetch account info again",
        "cls": "clear the console"
    };

    const [terminalInput, setTerminalInput] = useState("");
    const [terminalOutput, setTerminalOutput] = useState("");
    const [terminalHistory, setTerminalHistory] = useState([]);
    const [terminalHistoryIndex, setTerminalHistoryIndex] = useState(-1);

    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef();

    const { currentUser, fetchUser } = useUserStore();


    useEffect(() => {
        async function startTerminal() {
            sendMessage("Welcome to duckOS!\nversion 0.0");
            await sleep(500);
            fetchUser(0)
                .then((res) => {
                    sendMessage("User " + res.currentUser.username + " found");
                })
                .catch((_) => {
                    sendMessage("No user found\nType \"login\", \"register\", or \"retry\" to authenticate\n Type \"help\" or \"?\" for a list of commands");
                });
            
            setIsInputActive(true);
        }
        startTerminal();
    }, []);

    function focusInput() {
        inputRef.current.focus();
    }

    function sendMessage(message) {
        setTerminalOutput(prev => prev + message + "\n");
    }

    function sleep(ms) {
        return new Promise(res => setTimeout(res,ms));
    }

    return (
        <div 
            id="terminalContainer" 
            className="h-full p-4 bg-black text-white font-terminal text-lg overflow-hidden"
        >
            <div id="terminal" className="whitespace-pre-line">{terminalOutput}</div>
            {
                isInputActive &&
                <input 
                    type="text" 
                    className="w-full border-none outline-none m-0 p-0 bg-transparent text-white" 
                    value={"$ " + terminalInput}
                    ref={inputRef}
                    autoFocus
                    onBlur={focusInput}
                    onChange={(e) => setTerminalInput(e.target.value.slice(2))}
                    onKeyDown={(e) => {
                        switch (e.key) {
                            case "Enter":
                                // Send input to output, and reset input
                                setTerminalOutput(prev => prev + "$ " + terminalInput + "\n");
                                setTerminalInput("");
                                
                                // Add input to history and remove last if length goes over 100
                                setTerminalHistory(prev => [terminalInput, ...prev]);
                                if (terminalHistory.length >= 25) {
                                    setTerminalHistory(prev => [...prev.slice(0,25)]);
                                }

                                // Deal with commands
                                switch (terminalInput.toLowerCase()) {
                                    case "help":
                                    case "?":
                                        for (const [key, value] of Object.entries(commands)) {
                                            sendMessage(key + " - " + value);
                                        }
                                        break;
                                    case "cls":
                                        setTerminalOutput("");
                                        break;
                                    case "login":
                                        sendMessage("Coming soon to a console near you ;)");
                                        break;
                                    case "register":
                                        sendMessage("Coming soon to a console near you ;)");
                                        break;
                                    case "retry":
                                        fetchUser(1)
                                            .then((res) => {
                                                sendMessage("User " + res.currentUser.username + " found");
                                            })
                                            .catch((_) => {
                                                sendMessage("No user found\nType \"login\", \"register\", or \"retry\" to authenticate\n Type \"help\" or \"?\" for a list of commands");
                                            });
                                        break;
                                    default:
                                        setTerminalOutput(prev => prev + "Command not found\nType \"help\" or \"?\" for a list of commands\n")
                                }
                                
                                //Reset terminal history index
                                setTerminalHistoryIndex(-1);
                                break;
                            case "ArrowUp" :
                                if (terminalHistoryIndex <= terminalHistory.length - 2) {
                                    setTerminalHistoryIndex(prev => prev + 1);
                                    setTerminalInput(terminalHistory[terminalHistoryIndex + 1]);
                                    break;
                                }
                                setTerminalInput(terminalHistory[terminalHistoryIndex]);
                                break;
                            case "ArrowDown":
                                if (terminalHistoryIndex > 0) {
                                    setTerminalHistoryIndex(prev => prev - 1);
                                    setTerminalInput(terminalHistory[terminalHistoryIndex - 1]);
                                    break;
                                }
                                setTerminalHistoryIndex(-1);
                                setTerminalInput("");
                            }
                        }
                    }
                />
            }
        </div>
    )
}

export default Terminal;
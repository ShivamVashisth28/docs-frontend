import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import QuillCursors from 'quill-cursors';
Quill.register("modules/cursors", QuillCursors);
import { URL } from '../utils/backendUrl.js'

const TOOLBAR_OPTIONS = [ 
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function NewEditor({setConnectedUsers}) {
  const { documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const [name, setName] = useState("")
  


  const setUserName = async () => {
      const response = await axios.get(`${URL}/user/getUserDetails`, {withCredentials: true})
      const data = await response.data

      if(data['status'] == 'success') {
        
        setName(data['user']['username'])
      }
  }

  useEffect(()=>{
    setUserName()
  },[])

  useEffect(() => {
    const s = io(URL)
    setSocket(s)
    

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null || name == "") return
    
    
    socket.emit("get-document", documentId, name)

    socket.once("load-document", document => {
      if(document){
        quill.setContents(JSON.parse(document))
      }else{
        quill.setContents()
      }
      quill.enable()
    })

  }, [socket, quill, documentId, name])

  const saveContent = async ()=>{

    if(quill == null) return
    const content = JSON.stringify(quill.getContents())
    if(content == "") return
    if(content == "loading...") return
    console.log({content, name});
    const response = await axios.post(`${URL}/document/content?documentId=${documentId}`, {content})
    const data = response.data
    // console.log(data)

    if(data['status'] !== 'success'){
      toast.error(data['message'])
    }
  }

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      saveContent()
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])


  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  // CURSORS 

  // generate colors
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (socket == null || quill == null || !name ) return;
    
    const cursors = quill.getModule("cursors");
    const colorMap = {}; // Store colors for each user
  
    const cursorHandler = ({ range, userName }) => {
      // console.log(userName)
      
      if (range) {
        // Assign a color if not already assigned
        if (!colorMap[userName]) {
          colorMap[userName] = generateRandomColor();
        }
        const userColor = colorMap[userName];
        // console.log(colorMap)
        
        // Create or update the cursor
        // console.log(`Creating cursor for ${userName} at range:`, range);
        cursors.createCursor(userName, userName, userColor);
        cursors.moveCursor(userName, range);
      }
    };
  
   
    socket.on("cursor-position", cursorHandler);
  
  
    const removeCursorHandler = userName => {
      // console.log(`Removing cursor for user: ${userName}`);
      cursors.removeCursor(userName);
      delete colorMap[userName];
    };
    socket.on("user-disconnected", removeCursorHandler);
  
    const clearCursorsOnRefresh = () => {
      const activeCursors = cursors.cursors(); 
      Object.keys(activeCursors).forEach(cursorId => {
        cursors.removeCursor(cursorId); 
      });
      Object.keys(colorMap).forEach(key => delete colorMap[key]); // Clear color map
      };
  
    socket.on("get-users", (userList) => {
      clearCursorsOnRefresh(); // Reset all cursors
      userList.forEach(user => {
        if (user.documentId === documentId) {
          colorMap[user.userName] = generateRandomColor();
          cursors.createCursor(user.userName, user.userName, colorMap[user.userName]);
        }
      });
    });
  
    return () => {
      socket.off("cursor-position", cursorHandler);
      socket.off("user-disconnected", removeCursorHandler);
      socket.off("get-users");
    };
  }, [socket, quill, name]);
  

  useEffect(() => {
    if (socket == null || quill == null || !name) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return

      const range = quill.getSelection();
      if (range) {
        socket.emit("cursor-position", {
          documentId,
          range,
          userName: name,
        });
      }

      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill, name])

  useEffect(() => {
    if (socket == null) return;

    const userHandler = (users) => {
      setConnectedUsers(users.filter(user => user.documentId === documentId)); // Filter by document
    };

    socket.on('get-users', userHandler);

    return () => {
      socket.off('get-users', userHandler);
    };
  }, [socket, documentId]);

  const wrapperRef = useCallback(async wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS, cursors: true, },
      
    })
    q.disable()
    q.setText("loading...")
    setQuill(q)
  }, [])

  return <div className="container" ref={wrapperRef}></div>
}
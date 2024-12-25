  import { useCallback, useEffect, useState } from "react"
  import Quill from "quill"
  import "quill/dist/quill.snow.css"
  import { io } from "socket.io-client"
  import { useParams } from "react-router-dom"
  import axios from "axios"
  import { toast } from "react-toastify"

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

  export default function NewEditor() {
    const { documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
      const s = io("http://localhost:5000")
      setSocket(s)

      return () => {
        s.disconnect()
      }
    }, [])

    useEffect(() => {
      if (socket == null || quill == null) return
      socket.emit("get-document", documentId)

      socket.once("load-document", document => {
       
        quill.setContents(JSON.parse(document))
        quill.enable()
      })

    }, [socket, quill, documentId])

    const saveContent = async ()=>{

      if(quill == null) return
      const content = JSON.stringify(quill.getContents())
      if(content == "") return
      const response = await axios.post(`http://localhost:5000/document/content?documentId=${documentId}`, {content})
      const data = response.data

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

    useEffect(() => {
      if (socket == null || quill == null) return

      const handler = (delta, oldDelta, source) => {
        if (source !== "user") return
        socket.emit("send-changes", delta)
      }
      quill.on("text-change", handler)

      return () => {
        quill.off("text-change", handler)
      }
    }, [socket, quill])

    const wrapperRef = useCallback(async wrapper => {
      if (wrapper == null) return

      wrapper.innerHTML = ""
      const editor = document.createElement("div")
      wrapper.append(editor)
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      })
      q.disable()
      q.setText("loading")
      setQuill(q)
    }, [])
    return <div className="container" ref={wrapperRef}></div>
  }
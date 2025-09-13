import { useState } from "react"
import { Input } from "../ui/input"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function CustomPassword({ placeholder, ...props } : { placeholder?:string } & React.InputHTMLAttributes<HTMLInputElement>){
    const [view, setView] = useState(false)
    return(
        <div className="relative">
            <Input type={view ? "text" : "password"} placeholder={placeholder} {...props} />
            { view ? <FaEye className="absolute top-1/3 right-4 cursor-pointer" onClick={() => setView(!view)} /> : <FaEyeSlash className="absolute top-1/3 right-4 cursor-pointer" onClick={() => setView(!view)} />}
        </div>
    )
}
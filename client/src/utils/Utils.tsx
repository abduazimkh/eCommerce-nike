import "./Utils.scss"
import { Children } from "../types/ElementTypes.d"

const Container = ({children} : Children) => {
  return (
    <div className="container">
        {children}
    </div>
  )
}

export {Container}
export const App = () => {

  return (
    <>
      <h1>Hello!</h1>
      <div>React is amazing!</div>
      <button className="btn-secondary" onClick={handleBtnClick}>
        Click me!
      </button>
      <div>
        Count: {count}
      </div>
    </> 
  )
}

      

















{/* const [count, setCount] = useState(0)

const handleBtnClick = () => {
  setCount(count + 1)
} */}

// import { useState } from "react"
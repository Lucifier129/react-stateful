import React from "react"
import stateful from "./stateful"

function Normal(
  props,
  useEffect,
  [count = props.count || 0, setCount],
  [name = "Mary", setName],
  [surname = "Poppins", setSurname],
  [width = window.innerWidth, setWindowWidth]
) {
  useEffect(() => {
    document.title = count + " " + name + " " + surname
  })
  useEffect(() => {
    let handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  })
  return (
    <React.Fragment>
      <div>count {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>+1</button>{" "}
        <button onClick={() => setCount(count - 1)}>-1</button>
      </div>
      name: <input value={name} onChange={e => setName(e.target.value)} />
      <br />
      surname:{" "}
      <input value={surname} onChange={e => setSurname(e.target.value)} />
      <div>window width {width}</div>
    </React.Fragment>
  )
}

export default stateful(Normal)

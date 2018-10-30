import React from "react"
import ReactDOM from "react-dom"
import stateful, { useState, useEffect } from "./stateful"
import NormalStyle from "./NormalStyle"
import HookStyle from "./HookStyle"
import CustomHookStyle from "./CustomHookStyle"
import CustomNormalStyle from "./CustomNormalStyle"

const styles = {
  normal: NormalStyle,
  hook: HookStyle,
  custom: CustomHookStyle,
  customNormal: CustomNormalStyle
}

const useHash = () => {
  let [hash = window.location.hash, setHash] = useState()
  useEffect(() => {
    let handleHashChange = () => setHash(window.location.hash)
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  })
  return hash.slice(1)
}

function App() {
  let style = useHash() || "normal"
  let Target = styles[style] || NormalStyle
  return (
    <React.Fragment>
      <h1>Style {style}</h1>
      <div>
        {Object.keys(styles).map(name => {
          return (
            <a
              key={name}
              href={`#${name}`}
              style={{ display: "inline-block", marginLeft: 10 }}
            >
              {name}
            </a>
          )
        })}
      </div>
      <Target />
    </React.Fragment>
  )
}

const StatefulApp = stateful(App)

ReactDOM.render(<StatefulApp />, document.getElementById("root"))

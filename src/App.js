import "./App.css";
import { ConfigRoutes } from "./routes";

function App() {
  let hours = 5;
  let now = new Date().getTime();
  let setupTime = localStorage.getItem("setupTime");
  if (setupTime == null) {
    localStorage.setItem("setupTime", now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("setupTime", now);
    }
  }
  return (
    <>
      <ConfigRoutes />
    </>
  );
}

export default App;

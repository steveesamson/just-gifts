import { Outlet } from "react-router-dom";
import Status from "./views/status";
import SideBar from "./views/sidebar";

function App() {
  return (
    <div className="page">
      <SideBar />
      <main>
        <Status />
        <section className="liner" id="scroller">
          <article className="container">
            <Outlet />
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;

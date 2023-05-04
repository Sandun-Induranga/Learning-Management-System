import { useEffect } from "react";
import Content from "./components/Content";
import AOS from "aos";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Announcement /> */}
      {/* <ClassWorks /> */}
      <Content data-aos="fade-up" />
    </>
  );
}

export default App;

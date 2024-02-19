import { forwardRef } from "react";
import Announcement from "../../components/announcement/Announcement";
import Hero from "../../components/hero/Hero";
import Main from "../../layout/Main";

const Home = forwardRef<HTMLDivElement>((props, mainElement) => {
  console.log(props);
 
  return (
    <>
     
     <div ref={mainElement}>
      <Announcement/>
      <Hero/>
      <Main/>
     </div>
    </>
  )
})

export default Home
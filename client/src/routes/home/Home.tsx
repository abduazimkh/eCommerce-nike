import { forwardRef } from "react";
import Announcement from "../../components/announcement/Announcement";
import Hero from "../../components/hero/Hero";
import Main from "../../layout/Main";

const Home = forwardRef<HTMLDivElement>((props, mainElement) => {
 
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
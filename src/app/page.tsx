import About from './components/About';
import Chat from './components/Chat/Chat';
import NavBar from './components/NavBar';


export default function Home() {
  return (
    <div className='MaxWidthWrapper'>
      <About />
      <NavBar />
    <Chat />
    <footer>ArtWithUtility Copyright 2024</footer>

    </div>
  )
  
  
}

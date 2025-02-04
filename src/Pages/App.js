import '../styles/global.css';
import { useState, useEffect} from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls} from "@react-three/drei"
import { OrbitControls } from '@react-three/drei'
import Earth from '../3d/Earth'
import Navbar from '../Components/Navbar';
import { AmbientLight } from 'three';

function Model1(props) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/simon.glb");
  return <primitive object={scene} {...props} />;
}

function Model2(props) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/simonsite");
  return <primitive object={scene} {...props} />;
}

function App() {
  const [fadeComplete, setFadeComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeComplete(true);}, 100);
    return () => clearTimeout(timeout);}, []);
  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
        </header>
        <div className={`fade-overlay ${fadeComplete ? 'hidden' : ''}`}></div>
        <Canvas dpr={[1,2]} shadows camera={{position: [0,0,8], fov:55}} style={{"position": "fixed"}}>
          <color attach="background" args={["#101010"]}/>
          <pointLight position={[0, 5, 5]} intensity={20.5} />
          <directionalLight position={[0, 10, 10]} intensity={2} castShadow />
          <PresentationControls speed={1.5} global zoom={1}>
                <Model1 scale={50} position={[-18.4, -13.2, 10]} rotation-y={Math.PI * -0.21}/>
              <Model2 scale={0.049} position={[0, -2, -2]}/>
          </PresentationControls>
        </Canvas>
      
    </div>
  );
}

export default App;

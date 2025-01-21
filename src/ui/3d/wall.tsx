import { useGLTF } from "@react-three/drei"
import { useState } from "react"

const WallObj = () => {
  const { scene } = useGLTF(
    chrome.runtime.getURL("public/3d/concrete_fence/scene.gltf")
  )
  const [hovered, setHovered] = useState(false)

  return (
    <primitive
      object={scene}
      scale={hovered ? 1.1 : 1}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => console.log("Wall clicked!")}
    />
  )
}

export { WallObj }

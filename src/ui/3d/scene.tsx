import { Canvas } from "@react-three/fiber"
import React from "react"

import { WallObj } from "./wall"

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <WallObj />

      {/* <OrbitControls /> */}
    </Canvas>
  )
}

export { Scene }

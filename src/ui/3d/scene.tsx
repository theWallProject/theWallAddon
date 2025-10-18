import { Canvas } from "@react-three/fiber"
import React, { useRef } from "react"
import { Group, Vector3 } from "three"

import { LoveEmojiObj } from "./LoveEmojiObj"
import { ScreamEmojiObj } from "./ScreamEmojiObj"
import { WallObj } from "./WallObj"

const GROUP_POS = new Vector3(0, 0, 0)
const GROUP_SCALE = new Vector3(1, 1, 1)

const Scene = ({
  isSharing,
  isSkipping
}: {
  isSkipping: boolean
  isSharing: boolean
}) => {
  const groupRef = useRef<Group>(null)

  // useEffect(() => {
  //   log("Scene: useEffect", groupRef.current)
  //   const handleResize = () => {
  //     log("Scene: useEffect handleResize", groupRef.current)

  //     if (groupRef.current) {
  //       const newScale =
  //         Math.min(window.innerWidth, window.innerHeight) * SCALE_MULTIPLIER
  //       log("Scene: useEffect handleResize newScale", newScale)
  //       // groupRef.current.scale.set(newScale, newScale, newScale)
  //     } else {
  //       warn("Scene: useEffect handleResize groupRef.current is null")
  //     }
  //   }

  //   window.addEventListener("resize", handleResize)

  //   const interval = setInterval(() => {
  //     log("Scene: useEffect interval", groupRef.current)
  //     if (groupRef.current) {
  //       handleResize()
  //       clearInterval(interval)
  //     }
  //   }, 50)

  //   return () => {
  //     clearInterval(interval)

  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

  return (
    <Canvas fallback={<div>WebGL not supported!</div>}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <group ref={groupRef} position={GROUP_POS} scale={GROUP_SCALE}>
        <WallObj />
        <LoveEmojiObj isActive={isSharing} />
        <ScreamEmojiObj isActive={isSkipping} />
      </group>

      {/* <OrbitControls /> */}
    </Canvas>
  )
}

export { Scene }

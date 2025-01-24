import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

const INITIAL_X_ROTATION = 0 * (Math.PI / 180)
const INITIAL_Y_ROTATION = 90 * (Math.PI / 180)
const INITIAL_Z_ROTATION = 0 * (Math.PI / 180)
const ROTATION_SENSITIVITY = 0.5
const ROTATION_SMOOTHING = 0.1
const MAX_ROTATION_Y = 0.2
const MAX_ROTATION_X = 0.2
const SCALE_MULTIPLIER = 0.0008

const WallObj = () => {
  const { scene } = useGLTF(
    chrome.runtime.getURL("public/3d/concrete_fence/scene.gltf")
  )
  const { pointer, size } = useThree()
  const wallRef = useRef<Group>(null)

  useEffect(() => {
    if (wallRef.current) {
      wallRef.current.rotation.set(
        INITIAL_X_ROTATION,
        INITIAL_Y_ROTATION,
        INITIAL_Z_ROTATION
      )
      const initialScale = Math.min(size.width, size.height) * SCALE_MULTIPLIER
      wallRef.current.scale.set(initialScale, initialScale, initialScale)
    }
  }, [size])

  useEffect(() => {
    const handleResize = () => {
      if (wallRef.current) {
        const newScale =
          Math.min(window.innerWidth, window.innerHeight) * SCALE_MULTIPLIER
        wallRef.current.scale.set(newScale, newScale, newScale)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useFrame(() => {
    if (wallRef.current) {
      const targetRotationY =
        INITIAL_Y_ROTATION + pointer.x * ROTATION_SENSITIVITY
      const targetRotationX =
        INITIAL_X_ROTATION - pointer.y * ROTATION_SENSITIVITY

      wallRef.current.rotation.y +=
        (targetRotationY - wallRef.current.rotation.y) * ROTATION_SMOOTHING
      wallRef.current.rotation.x +=
        (targetRotationX - wallRef.current.rotation.x) * ROTATION_SMOOTHING

      wallRef.current.rotation.y = Math.max(
        INITIAL_Y_ROTATION - MAX_ROTATION_Y,
        Math.min(
          INITIAL_Y_ROTATION + MAX_ROTATION_Y,
          wallRef.current.rotation.y
        )
      )
      wallRef.current.rotation.x = Math.max(
        INITIAL_X_ROTATION - MAX_ROTATION_X,
        Math.min(
          INITIAL_X_ROTATION + MAX_ROTATION_X,
          wallRef.current.rotation.x
        )
      )
    }
  })

  return (
    <primitive
      ref={wallRef}
      object={scene}
      // scale={hovered ? 1.1 : 1}
      position={[0, -1, 0]}
      // onPointerOver={() => setHovered(true)}
      // onPointerOut={() => setHovered(false)}
      onClick={() => console.log("Wall clicked!")}
    />
  )
}

export { WallObj }

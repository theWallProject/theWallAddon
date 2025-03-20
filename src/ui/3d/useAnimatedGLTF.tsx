import { useGLTF } from "@react-three/drei"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { Euler, Group, Vector3 } from "three"

const ANIMATION_START = {
  position: new Vector3(0, 0, -2),
  rotation: new Euler(0, 0, 0),
  scale: new Vector3(0.01, 0.01, 0.01)
}

const ANIMATION_END = {
  position: new Vector3(0, 1.4, 1.11),
  rotation: new Euler(0, Math.PI * 2, 0),
  scale: new Vector3(0.02, 0.02, 0.02)
}

// const SCALE_MULTIPLIER = 0.00005

type UseAnimatedGLTFProps = {
  glbPath: string
  isActive: boolean
}

const useAnimatedGLTF = ({ glbPath, isActive }: UseAnimatedGLTFProps) => {
  const { scene } = useGLTF(glbPath)
  const tweenRef = useRef<gsap.core.Timeline | null>(null)
  const progressRef = useRef(0)
  const groupRef = useRef<Group>(null)

  useEffect(() => {
    if (!groupRef.current) return

    groupRef.current.position.copy(ANIMATION_START.position)
    groupRef.current.rotation.copy(ANIMATION_START.rotation)
    groupRef.current.scale.copy(ANIMATION_START.scale)

    tweenRef.current = gsap
      .timeline({ paused: true })
      .to(groupRef.current.position, {
        x: ANIMATION_END.position.x,
        y: ANIMATION_END.position.y,
        z: ANIMATION_END.position.z,
        duration: 1,
        ease: "back.inOut(1.7)"
      })
      .to(
        groupRef.current.rotation,
        {
          x: ANIMATION_END.rotation.x,
          y: ANIMATION_END.rotation.y,
          z: ANIMATION_END.rotation.z,
          duration: 1,
          ease: "power2.inOut"
        },
        "<"
      )
      .to(
        groupRef.current.scale,
        {
          x: ANIMATION_END.scale.x,
          y: ANIMATION_END.scale.y,
          z: ANIMATION_END.scale.z,
          duration: 1,
          ease: "power2.inOut"
        },
        "<"
      )

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (groupRef.current) {
  //       const newScale =
  //         Math.min(window.innerWidth, window.innerHeight) * SCALE_MULTIPLIER
  //       groupRef.current.scale.set(newScale, newScale, newScale)
  //     }
  //   }

  //   window.addEventListener("resize", handleResize)
  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  useEffect(() => {
    if (!tweenRef.current) return

    const tween = tweenRef.current

    if (isActive) {
      tween.play()
    } else {
      tween.reverse()
    }

    progressRef.current = tween.progress()
  }, [isActive])

  return { scene, groupRef }
}

export { useAnimatedGLTF }

import { useEffect, useRef, useState } from "react";





/**
 * 
 * @param {{ observerRoot: import("react").RefObject, ref: import("react").RefObject, callback : Function():void, rootMargin: string, threshold: number}} param0 
 */
export function useSectionHook({ref, callback, rootMargin, threshold, observerName, observerRoot}) {
    const [isInViewOrNextView, setIsInViewOrNextView] = useState(false)
    const callbackRef = useRef(callback)
    const timerRef = useRef(null)
    
    useEffect(()=> {
        
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if (!ref.current) return;
        if (!observerRoot.current) return;

        
        const observer = new IntersectionObserver( (entries) => {
            
            entries.forEach((entry) => {
                
                if (entry.target === ref.current) {
                    
                    //setIsInViewOrNextView(entry.isIntersecting)
                    if (entry.isIntersecting) {
                        if (!timerRef.current) {
                            timerRef.current = setTimeout(()=> {
                                
                                callbackRef.current()
                                timerRef.current = null    
                            }, 300)
                        }
                        
                    } else {
                        if (timerRef.current) {
                            clearTimeout(timerRef.current)
                            timerRef.current = null
                        }
                    }
                }
            })
        }, {
            root: observerRoot.current,
            threshold: threshold,
            rootMargin: rootMargin
        })

        
        observer.observe(ref.current)
        return () => {


            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
              }
            
            return ref.current ? observer.unobserve(ref.current) : undefined
        } 
    }, [callback, ref, observerName, threshold, rootMargin, observerRoot])

}
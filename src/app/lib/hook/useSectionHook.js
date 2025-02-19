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
        console.log("hello from thte entrie", "callback register");
        
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if (!ref.current) return;
        if (!observerRoot.current) return;

        console.log("observ regisered for callback", observerName);
        
        const observer = new IntersectionObserver( (entries) => {
            
            entries.forEach((entry) => {
                console.log(entry.intersectionRatio, "hello from thte entrie");
                
                if (entry.target === ref.current) {
                    
                    //setIsInViewOrNextView(entry.isIntersecting)
                    if (entry.isIntersecting) {
                        if (!timerRef.current) {
                            console.log(observerName, "hello forom the entry target");
                            timerRef.current = setTimeout(()=> {
                                console.log("hello next callback will fire");
                                
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

        console.log(observerName, "observercreated");
        
        observer.observe(ref.current)
        return () => {

            console.log(observerName, "observerdelted");

            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
              }
            
            return ref.current ? observer.unobserve(ref.current) : undefined
        } 
    }, [callback, ref, observerName, threshold, rootMargin, observerRoot])

}
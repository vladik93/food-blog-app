import './PromoCarousel.css';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';


export const CarouselItem = ({children, width}) => {
    return (
        <div className="carouselItem" style={{width: width}}>
            {children}
        </div>
    )
}



const PromoCarousel = ({ children }) => {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ paused, setPaused ] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if(!paused) {
                updateIndex(activeIndex + 1);
            }
        }, 5000)

        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    });

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    const updateIndex = (newIndex) => {
        if(newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        } else if(newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    }

    return (
        <div {...handlers} className="promoCarousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: '100%'})
                })}
            </div>
            <div className="indicators">
                <button onClick={() => updateIndex(activeIndex - 1)} className="move">
                    Prev
                </button>
                {React.Children.map(children, (child, index) => {
                    return (
                        <button 
                            className={`${index === activeIndex ? "active" : ""}`}
                            onClick={() => updateIndex(index)}>
                            {index + 1}
                        </button>
                    )
                })}
                <button onClick={() => updateIndex(activeIndex + 1)} className="move">
                    Next
                </button>
            </div>
        </div>
    )
};



export default PromoCarousel;
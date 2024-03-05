import { useEffect, useState } from 'react';
import './Popup.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



export default function Popup({ darkMode }) {
    const [showPopup, setShowPopup] = useState(false);
    const textPopup = "Let the hacking begin! *_* ";

    useEffect(() => {
        setShowPopup(true);


        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 8000);

        return () => clearTimeout(timer);
    }, [darkMode]);


    return (
        <>
            <div className={showPopup ? "popup show" : "popup"}>
                <span className="typing-effect">{textPopup}</span>
            </div>
        </>
    );
}
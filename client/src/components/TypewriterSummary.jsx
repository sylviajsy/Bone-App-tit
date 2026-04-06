import { useState, useEffect } from 'react';

export const TypewriterSummary = ({ placeSummary }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (!placeSummary) return;

        setDisplayText('');

        let index = 0;

        const interval = setInterval(() => {
            setDisplayText((prev) => prev + placeSummary[index]);
            index++;

            if (index >= placeSummary.length) {
                clearInterval(interval);
            }
        }, 50);

            return () => clearInterval(interval);
        }, [placeSummary]);

  return (
    <div>
        <p>✨ {displayText}<span className="cursor">|</span></p>
    </div>
  )
}

import { useState, useEffect } from 'react';

export const TypewriterSummary = ({ placeSummary }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (!placeSummary) return;

        setDisplayText('');

        let index = 0;

        const interval = setInterval(() => {
            if (index < placeSummary.length){
                const next = placeSummary.slice(0, index + 1);
                setDisplayText(next);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);

            return () => clearInterval(interval);
        }, [placeSummary]);

        console.log('placeSummary prop =', placeSummary, typeof placeSummary);
        console.log('displayText =', displayText);

  return (
    <div>
        <p>✨ {displayText}<span className="cursor">|</span></p>
    </div>
  )
}

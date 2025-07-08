import { memo, useEffect, useRef } from 'react';


interface METRIC_INTERFACE {
    submit:boolean,
    result: {
        speed: {
            visualLoad: string;
            fullPageLoad: string;
        };
        pageSize: string;
        nRequest: number;
    } | null
}

const Metric = memo(( {submit , result}:METRIC_INTERFACE )=>{

    const metricRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (submit && metricRef.current ) {
            metricRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [submit]);

    if(!submit) return null

  return (
   <>
   {
        submit && (
            <div ref={metricRef} className="w-full max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-md">
            {
                result ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-semibold">Visual Load</h3>
                                <p className="text-xl">{result.speed.visualLoad}</p>
                            </div>
                            <div className="p-4 bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-semibold">Full Page Load</h3>
                                <p className="text-xl">{result.speed.fullPageLoad}</p>
                            </div>
                            <div className="p-4 bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-semibold">Page Size</h3>
                                <p className="text-xl">{result.pageSize}</p>
                            </div>
                            <div className="p-4 bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-semibold">Number of Requests</h3>
                                <p className="text-xl">{result.nRequest}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-400">Loading metrics...</p>
                )
            }
            </div>
        )
    }
   </>
  )
})


Metric.displayName='Metric';
export default Metric
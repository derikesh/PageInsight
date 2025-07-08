import { useState } from 'react';

// compoent 
import Metric from './component/Metric';

interface FORM_DATA {
  name:string
}

interface RESULT_INTERFACE {
  speed:{
    visualLoad:any,
    fullPageLoad:any
  },
  pageSize:any,
  nRequest:any
}

function App() {

  const [data, setData] = useState<FORM_DATA>({
    name:''
  });


  const [ load , setLoad ] = useState<boolean>(false);

  const [ submit , setSubmit ] = useState<boolean>(false);

  const [result , setResult ] = useState<RESULT_INTERFACE | null>(null);


  const handleSubmit = async (e:React.FormEvent)=>{
      e.preventDefault();
      setSubmit(true);
      setLoad(true);
      setResult(null);

      try{
        const urlEntered = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${data.name}&key=${import.meta.env.VITE_API_KEY}`);
        const res = await urlEntered.json();

        console.log(res);

        if(res.lighthouseResult){
          setResult({
            speed: {
              visualLoad: res.lighthouseResult.audits['speed-index'].displayValue,
              fullPageLoad: res.lighthouseResult.audits['interactive'].displayValue
            },
            pageSize: res.lighthouseResult.audits['total-byte-weight'].displayValue,
            nRequest: res.lighthouseResult.audits['network-requests'].details.items.length
          });
        }
      }catch(err:any){
          console.error('API Error:', err);
      } finally {
        setLoad(false);
      }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white p-4 font-sans">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center my-12">
          <h1 className="text-5xl font-bold text-white mb-3 ">Website Performance Checker</h1>
          <p className="text-3xl text-gray-400">Enter a URL to analyze its performance metrics instantly.</p>
        </header>
        
        <main>
          <div className='form-container' >
            <form onSubmit={handleSubmit} className="flex gap-3 mb-8 items-center">
                <label htmlFor="name" className="sr-only">Your Page Url</label>
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input 
                    id="name"
                    value={data.name}
                    onChange={ (e)=>setData( (prev) => ({...prev , name:e.target.value}) ) } 
                    type="text" 
                    name='name'
                    placeholder="e.g. https://www.example.com"
                    required
                    className="w-full p-4 pl-10 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button type='submit' disabled={load} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105">
                  {load ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : 'Analyze'}
                </button>
            </form>
          </div>

          <Metric submit={submit} result={result} />
        </main>
      </div>
    </div>
  )
}

export default App

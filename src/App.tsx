import { useState } from 'react';
import { Zap ,Globe, Activity } from 'lucide-react';

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
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
     
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center pt-16 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-6 leading-tight">
              Performance
              <span className="block text-white">Insights</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Analyze your website's performance with Google PageSpeed Insights and get actionable recommendations.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Search Form */}
            <div className="mb-16">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Globe className="h-5 w-5 text-slate-400" />
                        </div>
                        
                        <input
                          id="name"
                          value={data.name}
                          onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                          type="url"
                          name="name"
                          placeholder="https://www.example.com"
                          required
                          className="w-full h-14 pl-12 pr-4 bg-transparent text-white placeholder-slate-400 border-0 focus:outline-none focus:ring-0 text-lg"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={load}
                        className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:shadow-none flex items-center justify-center min-w-[140px]"
                      >
                        {load ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Activity className="mr-2 h-5 w-5" />
                            Analyze
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Results */}
            <Metric submit={submit} result={result} />
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-slate-800">
          <p className="text-slate-400">
            Powered by Google PageSpeed Insights API
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App

"use client";
import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import {usePresentationStore} from "@/lib/store/presentationStore";
import {SlideRenderer} from "@/components/presentation/SlideRenderer";
import {exportPresentationToPDF} from "@/lib/pdf/exportPDF";
import {Button} from "@/components/ui/button";
import {Download,ArrowLeft,Loader2} from "lucide-react";
export default function ExportPage(){
  const params=useParams();
  const router=useRouter();
  const id=params.id as string;
  const locale=params.locale as string;
  const{currentPresentation:p,setCurrentPresentation}=usePresentationStore();
  const[exp,setExp]=useState(false);
  const[prog,setProg]=useState(0);
  useEffect(()=>{setCurrentPresentation(id);},[id,setCurrentPresentation]);
  const doExport=async()=>{
    if(!p)return;
    setExp(true);
    setProg(0);
    try{
      const int=setInterval(()=>setProg(prev=>Math.min(prev+10,90)),200);
      await exportPresentationToPDF(p,{filename:`${p.title}_MoreHarvest.pdf`,quality:0.95});
      clearInterval(int);
      setProg(100);
      setTimeout(()=>router.push(`/${locale}/presentations/${id}`),1500);
    }catch(e){alert("Export failed");}finally{setExp(false);}
  };
  if(!p)return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin"/></div>;
  return <div className="min-h-screen bg-neutral-50 py-12 px-4"><div className="max-w-6xl mx-auto"><div className="flex justify-between mb-8"><Button variant="ghost" onClick={()=>router.push(`/${locale}/presentations/${id}`)} disabled={exp}><ArrowLeft className="w-4 h-4 mr-2"/>Back</Button><Button onClick={doExport} disabled={exp} className="bg-brand-amber">{exp?<><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Exporting... {prog}%</>:<><Download className="w-4 h-4 mr-2"/>Download PDF</>}</Button></div><div className="bg-white rounded-lg p-6 mb-8 border"><h2 className="text-h3 font-semibold mb-2">PDF Export Preview</h2><p>Review how your slides will appear in the PDF</p></div>{exp&&<div className="mb-8"><div className="h-2 bg-neutral-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-primary transition-all" style={{width:`${prog}%`}}/></div></div>}<div className="space-y-8">{p.slides.map((s,i)=><div key={s.id} id={`slide-${i}`} className="bg-white rounded-lg shadow-lg overflow-hidden" style={{width:"100%",aspectRatio:"16/9"}}><SlideRenderer slide={s} language={p.language}/></div>)}</div></div></div>;
}

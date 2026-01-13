"use client";
import {useCallback,useState} from "react";
import {useDropzone} from "react-dropzone";
import {Upload,FileText,Loader2} from "lucide-react";
import {cn} from "@/lib/utils";
export function UploadZone({onUpload}:{onUpload:(f:File)=>Promise<void>}){
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState<string|null>(null);
  const onDrop=useCallback(async(files:File[])=>{if(!files[0])return;setLoading(true);setError(null);try{await onUpload(files[0]);}catch(e){setError(e instanceof Error?e.message:"Upload failed");}finally{setLoading(false);}},[onUpload]);
  const{getRootProps,getInputProps,isDragActive,fileRejections}=useDropzone({onDrop,accept:{"text/plain":[".txt"],"application/pdf":[".pdf"]},maxFiles:1,maxSize:10*1024*1024,disabled:loading});
  return <div className="w-full max-w-2xl mx-auto"><div {...getRootProps()} className={cn("border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all","hover:border-brand-amber hover:bg-brand-amber/5",isDragActive&&"border-brand-amber bg-brand-amber/10",loading&&"pointer-events-none opacity-50",error&&"border-interaction-error",!error&&!isDragActive&&"border-neutral-300")}><input {...getInputProps()}/><div className="flex flex-col items-center gap-4">{loading?<><Loader2 className="w-12 h-12 text-brand-amber animate-spin"/><p>Processing...</p></>:<>{isDragActive?<Upload className="w-12 h-12 text-brand-amber"/>:<FileText className="w-12 h-12 text-neutral-400"/>}<div><p className="font-bold">{isDragActive?"Drop here":"Drag & drop here"}</p><p className="text-body-s text-neutral-500">or click to browse</p><p className="text-body-s text-neutral-400">Supports: TXT, PDF (max 10MB)</p></div></>}</div></div>{error&&<div className="mt-4 p-4 bg-interaction-error/10 border border-interaction-error rounded-lg"><p className="text-interaction-error">{error}</p></div>}{fileRejections.length>0&&<div className="mt-4 p-4 bg-interaction-error/10 border border-interaction-error rounded-lg"><p className="font-bold">File rejected:</p><ul>{fileRejections.map(({file,errors})=><li key={file.name}>{file.name}: {errors.map(e=>e.message).join(", ")}</li>)}</ul></div>}</div>;
}

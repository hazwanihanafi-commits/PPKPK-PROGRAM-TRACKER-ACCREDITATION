
import checklist from '../data/coppaChecklist.json';
export default function IPPTProgrammeTracker(){
 return (
  <div className='p-6'>
   <h1 className='text-2xl font-bold mb-4'>SRR & COPPA Compliance Tracker</h1>
   <table className='w-full border bg-white'>
    <thead className='bg-slate-100'>
     <tr><th className='border p-2'>Area</th><th className='border p-2'>Item</th><th className='border p-2'>Responsible</th><th className='border p-2'>Status</th></tr>
    </thead>
    <tbody>
     {checklist.map((c,i)=>(
      <tr key={i}>
       <td className='border p-2'>{c.area}</td>
       <td className='border p-2'>{c.item}</td>
       <td className='border p-2'>{c.owner}</td>
       <td className='border p-2'><input type='checkbox'/></td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 )
}

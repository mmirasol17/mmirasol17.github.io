import { Award, TrendingUp } from "lucide-react";

export function AboutAchievements() {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-3xl font-bold mb-6 text-center text-blue-400'>Academic Achievements</h2>
      <div className='bg-gradient-to-br from-gray-400 to-gray-700 rounded-2xl p-6 max-w-[600px]'>
        <div className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Award className='w-5 h-5 text-yellow-400 flex-shrink-0' />
            <span>
              <strong>GPA:</strong> 3.795 - Magna Cum Laude
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <TrendingUp className='w-5 h-5 text-green-400 flex-shrink-0' />
            <span>
              <strong>Dean's List:</strong> 8 Semesters
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <Award className='w-5 h-5 text-blue-400 flex-shrink-0' />
            <span>
              <strong>Scholarships:</strong> STEM Advantage Scholar, CSUSM S-STEM Scholar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

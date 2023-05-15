import LeftPanel from '@/components/custom-layout/left-panel/LeftPanel';
import RightPanel from '@/components/custom-layout/right-panel/RightPanel';

export default function Home() {
  return (
    <main className='grid items-start justify-center min-h-screen gap-y-10 p-3 lg:gap-10 lg:p-24 bg-white grid-cols-1 lg:grid-cols-3 mb-20'>
      <LeftPanel />
      <RightPanel />
    </main>
  );
}

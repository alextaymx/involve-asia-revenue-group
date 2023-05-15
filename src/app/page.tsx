import LeftPanel from '@/components/custom-layout/left-panel/LeftPanel';
import RightPanel from '@/components/custom-layout/right-panel/RightPanel';

export default function Home() {
  return (
    <main className='grid items-start justify-center min-h-screen gap-10 p-24 bg-white lg:grid-cols-3'>
      <LeftPanel />
      <RightPanel />
    </main>
  );
}

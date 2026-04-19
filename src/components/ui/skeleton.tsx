function Sk({ className }: { className: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export function CurriculoCardSkeleton() {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-3">
        <Sk className="h-11 w-11 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Sk className="h-4 w-36" />
          <Sk className="h-3 w-24" />
        </div>
      </div>
      <Sk className="h-3 w-full mb-2" />
      <Sk className="h-3 w-4/5 mb-4" />
      <div className="flex gap-1.5 mb-4">
        <Sk className="h-5 w-14 rounded-full" />
        <Sk className="h-5 w-16 rounded-full" />
        <Sk className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}

export function CurriculoDetailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="card">
        <div className="flex items-center gap-4">
          <Sk className="h-16 w-16 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Sk className="h-6 w-48" />
            <Sk className="h-4 w-32" />
            <Sk className="h-3 w-40" />
          </div>
        </div>
      </div>
      <div className="card space-y-2">
        <Sk className="h-4 w-32 mb-3" />
        <Sk className="h-3 w-full" />
        <Sk className="h-3 w-full" />
        <Sk className="h-3 w-3/4" />
      </div>
      <div className="card space-y-3">
        <Sk className="h-4 w-40 mb-3" />
        <Sk className="h-3 w-48" />
        <Sk className="h-3 w-36" />
        <Sk className="h-3 w-full" />
      </div>
    </div>
  );
}

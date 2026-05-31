export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand-bg z-50">
      <div
        className="h-12 w-12 rounded-full border-2 animate-spin"
        style={{ borderColor: "rgba(245,158,11,0.2)", borderTopColor: "#f59e0b" }}
      />
    </div>
  );
}

export default function AmbientBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-apricot/20 blur-[110px]" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blush/30 blur-[90px]" />
      <div className="absolute top-[50%] left-[40%] w-[25vw] h-[25vw] rounded-full bg-apricot/15 blur-[70px]" />
    </div>
  );
}

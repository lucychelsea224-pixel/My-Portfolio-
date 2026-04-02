export default function AdBanner({ slotId }: { slotId: string }) {
  return (
    <div
      className="w-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 rounded-md my-8"
      style={{ height: '170px' }}
    >
      <div className="text-gray-400 text-sm text-center">
        <p>Ad Slot: {slotId}</p>
        <p>170px Fixed Height</p>
        {/* Drop your AdSense or other ad network script here */}
      </div>
    </div>
  );
}

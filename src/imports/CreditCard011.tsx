import imgRectangle from "figma:asset/5f027551f5fd9323f35803cda832e8eea8904fc3.png";

function Layer() {
  return (
    <div className="absolute bottom-[9.49%] contents left-0 right-[68.67%] top-[-7.84%]" data-name="Layer 1">
      <p className="absolute bottom-[98.04%] font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic right-full text-[12px] text-black text-nowrap top-[-7.84%] whitespace-pre">&nbsp;</p>
      <div className="absolute inset-[66.91%_76.7%_9.49%_10.46%]" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle} />
        </div>
      </div>
      <div className="absolute inset-[53.95%_68.67%_46.05%_10.39%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-0.98%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 1">
            <path d="M0.5 0.5H51.55" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function CreditCard() {
  return (
    <div className="relative size-full" data-name="credit card-01 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 244 154">
        <path d="M243.78 0H0V153.07H243.78V0Z" fill="var(--fill-0, white)" id="Vector" />
      </svg>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[33.27%_74.85%_56.93%_10.39%] leading-[normal] not-italic text-[#0b0c0b] text-[12px] text-nowrap whitespace-pre">RATHI</p>
      <div className="absolute flex inset-[17.59%_11.47%_17.08%_47.51%] items-center justify-center">
        <div className="flex-none rotate-[90deg] size-[100px]">
          <p className="font-['Merriweather:Bold',sans-serif] leading-[normal] not-italic relative text-[#0b0c0b] text-[12px] text-nowrap whitespace-pre">Material Lab</p>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[44.04%_34.96%_44.2%_32.64%] leading-[normal] not-italic text-[#0b0c0b] text-[15px] text-nowrap whitespace-pre">CoFounder</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[18.71%_71.56%_71.49%_10.39%] leading-[normal] not-italic text-[#0b0c0b] text-[12px] text-nowrap whitespace-pre">{`DAMINI `}</p>
      <Layer />
    </div>
  );
}
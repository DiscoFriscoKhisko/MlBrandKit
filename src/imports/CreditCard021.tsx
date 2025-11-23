import imgRectangle from "figma:asset/6476e1b10abb071009c199bfce76ba071846b2ef.png";

function Group() {
  return (
    <div className="absolute contents inset-[13.71%_23.17%_61.79%_10.37%] leading-[normal] not-italic text-[15px] text-nowrap whitespace-pre" data-name="Group">
      <p className="absolute font-['Inter:Light',sans-serif] font-light inset-[13.71%_28.92%_74.53%_10.37%] text-[#d6d6de]">{`Please contact me at `}</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[26.45%_23.17%_61.79%_10.37%] text-white">damini@materiallab.io</p>
    </div>
  );
}

export default function CreditCard() {
  return (
    <div className="relative size-full" data-name="credit card-02 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 244 154">
        <path d="M243.78 0H0V153.07H243.78V0Z" fill="var(--fill-0, #0B0C0B)" id="Vector" />
      </svg>
      <Group />
      <p className="absolute font-['Inter:Light',sans-serif] font-light inset-[32.21%_11.04%_56.03%_82.81%] leading-[normal] not-italic text-[#d6d6de] text-[15px] text-nowrap whitespace-pre">or</p>
      <p className="absolute font-['Merriweather:Bold',sans-serif] inset-[77.64%_25.49%_12.56%_39.65%] leading-[normal] not-italic text-[#f3f3f5] text-[12px] text-nowrap whitespace-pre">materiallab.io</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium inset-[44.04%_33.53%_44.2%_9.86%] leading-[normal] not-italic text-[15px] text-nowrap text-white whitespace-pre">+91-805-013-1733</p>
      <div className="absolute inset-[66.91%_76.52%_9.49%_10.64%]" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function Page() {
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0b0b0b] text-white">
        {/* Background glow (subtle, like your screenshot) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-yellow-500/20 blur-[140px]" />
        <div className="absolute -bottom-52 -right-40 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />
      </div>

      {/* Center wrapper */}
      <main className="relative mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-4 py-10">
        {/* Card */}
        <section
          className="
            w-full
            max-w-[520px]
            rounded-2xl
            border border-white/15
            bg-black/35
            shadow-[0_20px_80px_rgba(0,0,0,0.55)]
            backdrop-blur-xl
            overflow-hidden
          "
        >
          {/* Scroll area (keeps button visible) */}
          <div className="no-scrollbar max-h-[88vh] overflow-y-auto px-6 pt-8 md:px-10">
            {/* Title */}
            <h1 className="text-center text-2xl font-semibold tracking-wide md:text-3xl">
              Giriş
            </h1>
            <div className="mx-auto mt-3 h-px w-3/4 bg-white/15" />

            {/* Form */}
            <div className="mt-6 space-y-6">
              {/* Ləqəb */}
              <div className="space-y-2 text-center">
                <label className="text-sm font-semibold text-white/85">
                  Ləqəb
                </label>
                <input
                  defaultValue="alissa"
                  className="
                    mx-auto block w-full max-w-[360px]
                    rounded-full border border-white/30
                    bg-black/35 px-4 py-2.5
                    text-sm text-white
                    outline-none
                    placeholder:text-white/40
                    focus:border-white/60
                  "
                />
              </div>

              {/* Cinsin */}
              <div className="space-y-3 text-center">
                <div className="text-sm font-semibold text-white/85">Cinsin</div>

                <div className="flex items-center justify-center gap-4">
                  <GenderButton
                    active={gender === "male"}
                    onClick={() => setGender("male")}
                    label="Kişi"
                    icon="male"
                  />
                  <GenderButton
                    active={gender === "female"}
                    onClick={() => setGender("female")}
                    label="Qadın"
                    icon="female"
                  />
                </div>
              </div>

              {/* Qısa məlumat */}
              <div className="space-y-2 text-center">
                <label className="text-xl font-semibold tracking-wide">
                  Qısa məlumat
                </label>
                <input
                  defaultValue="Qıvrıq qız!"
                  className="
                    mx-auto block w-full max-w-[420px]
                    rounded-2xl border border-white/25
                    bg-black/30 px-4 py-3
                    text-sm text-white
                    outline-none
                    placeholder:text-white/40
                    focus:border-white/60
                  "
                />
              </div>

              {/* Instagram */}
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                  <InstagramIcon />
                  <span>instagram</span>
                </div>
                <input
                  defaultValue="alissa"
                  className="
                    mx-auto block w-full max-w-[360px]
                    rounded-full border border-white/30
                    bg-black/35 px-4 py-2.5
                    text-sm text-white
                    outline-none
                    placeholder:text-white/40
                    focus:border-white/60
                  "
                />
              </div>
            </div>

            {/* Rules */}
            <div className="mt-10">
              <h2 className="text-center text-xl font-semibold text-white/70 md:text-2xl">
                Qaydalar və Gizlilik
              </h2>
              <div className="mx-auto mt-3 h-px w-3/4 bg-white/15" />

              <div className="mt-4 pb-6 text-sm leading-6 text-white/70">
                <p className="mb-3">
                  Bura sakit və təhlükəsiz bir məkandır.
                  Bu platforma real məkanda olan insanların, heç bir məcburiyyət
                  olmadan, bir-bir isi ilə əlaqə qurması üçün yaradılıb.
                </p>

                <ul className="list-disc space-y-2 pl-5">
                  <li>Burada tam anonim qalırsan.</li>
                  <li>
                    Adın, nömrən və şəxsi məlumatların paylaşılmır və saxlanılmır.
                  </li>
                  <li>
                    Qarşı tərəf yalnız razılıq verdikdən sonra səni görə və mesajlaşa bilər.
                  </li>
                  <li>Razılıq olmadan heç bir ünsiyyət başlamır.</li>
                  <li>Ünsiyyət jestlər və qısa mesajlar üzərindən qurulur.</li>
                  <li>
                    İstədiyin vaxt cavab verməyə və ya davam etməməyə haqqın var.
                  </li>
                  <li>
                    Sessiya bitdikdə bütün ünsiyyət avtomatik vurulur.
                  </li>
                  <li>
                    Mesajlar silinir, masa deaktiv edilir, heç nə saxlanılmır.
                  </li>
                  <li>Bu məkan hörmət və rahatlıq üzərində qurulub.</li>
                  <li>Narahatlıq yaradan davranışlara yol verilmir.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom button (sticky inside card) */}
          <div className="border-t border-white/10 bg-black/30 px-6 py-4 md:px-10">
            <button
              className="
                w-full rounded-full
                bg-[#F2C200] py-3
                text-center text-sm font-semibold
                text-black
                shadow-[0_12px_30px_rgba(242,194,0,0.25)]
                active:scale-[0.99]
              "
            >
              Qaydalarla razıyam
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function GenderButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: "male" | "female";
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "h-12 w-14 rounded-md border transition",
        active ? "border-white/70 bg-white/10" : "border-white/25 bg-black/20",
      ].join(" ")}
      aria-label={label}
      type="button"
    >
      <div className="flex h-full w-full items-center justify-center">
        {icon === "male" ? <MaleIcon /> : <FemaleIcon />}
      </div>
    </button>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4a6 6 0 1 1 0 12a6 6 0 0 1 0-12zm0 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8zm6.5-.9a1.1 1.1 0 1 1-2.2 0a1.1 1.1 0 0 1 2.2 0z"
      />
    </svg>
  );
}

function MaleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M16 2h6v6h-2V5.41l-4.3 4.3a7 7 0 1 1-1.4-1.42L18.59 4H16V2ZM10 9a5 5 0 1 0 0 10a5 5 0 0 0 0-10Z"
      />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 1 1 13.93V18h3v2h-3v2h-2v-2H8v-2h3v-2.07A7 7 0 0 1 12 2Zm0 2a5 5 0 1 0 0 10a5 5 0 0 0 0-10Z"
      />
    </svg>
  );
}

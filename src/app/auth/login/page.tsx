"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Gender, login, saveSession } from "@/services/auth";

type Errors = Partial<{
  nickname: string;
  gender: string;
  bio: string;
  instagram: string;
  acceptedRules: string;
  form: string;
}>;

export default function LoginPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("alissa");
  const [gender, setGender] = useState<Gender | null>(null);
  const [bio, setBio] = useState("Qıvrıq qız!");
  const [instagram, setInstagram] = useState("alissa");
  const [acceptedRules, setAcceptedRules] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const normalized = useMemo(() => {
    return {
      nickname: nickname.trim(),
      bio: bio.trim(),
      instagram: instagram.trim(),
    };
  }, [nickname, bio, instagram]);

  const validation = useMemo(() => validateAll({
    nickname: normalized.nickname,
    bio: normalized.bio,
    gender,
    instagram: normalized.instagram,
    acceptedRules,
  }), [normalized.nickname, normalized.bio, normalized.instagram, gender, acceptedRules]);

  const canSubmit = validation.isValid && !submitting;

  async function onSubmit() {
    // show errors if any
    setErrors(validation.errors);
    if (!validation.isValid) return;

    setSubmitting(true);
    setErrors({}); // clear top error
    try {
      const res = await login({
        nickname: normalized.nickname,
        gender: gender!, // safe: validated
        bio: normalized.bio,
        instagram: normalized.instagram ? normalized.instagram : undefined,
        acceptedRules,
      });

      saveSession(res.token, res.user);

      // redirect to next page (adjust later with your team)
      router.push("/"); // or "/home" / "/match"
    } catch (e: any) {
      setErrors((prev) => ({
        ...prev,
        form: e?.message || "Xəta baş verdi. Yenidən cəhd edin.",
      }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0b0b0b] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-yellow-500/20 blur-[140px]" />
        <div className="absolute -bottom-52 -right-40 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-4 py-10">
        <section className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/15 bg-black/35 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {/* Scroll area */}
          <div className="no-scrollbar max-h-[88vh] overflow-y-auto px-6 pt-8 md:px-10">
            <h1 className="text-center text-2xl font-semibold tracking-wide md:text-3xl">
              Giriş
            </h1>
            <div className="mx-auto mt-3 h-px w-3/4 bg-white/15" />

            {/* Top form error */}
            {errors.form ? (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errors.form}
              </div>
            ) : null}

            <div className="mt-6 space-y-6">
              {/* Nickname */}
              <div className="space-y-2 text-center">
                <label className="text-sm font-semibold text-white/85">
                  Ləqəb
                </label>
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="mx-auto block w-full max-w-[360px] rounded-full border border-white/30 bg-black/35 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
                />
                {errors.nickname ? (
                  <p className="text-xs text-red-300">{errors.nickname}</p>
                ) : null}
              </div>

              {/* Gender */}
              <div className="space-y-3 text-center">
                <div className="text-sm font-semibold text-white/85">Cinsin</div>

                <div className="flex items-center justify-center gap-4">
                  <GenderButton
                    active={gender === "male"}
                    onClick={() => setGender("male")}
                    icon="male"
                  />
                  <GenderButton
                    active={gender === "female"}
                    onClick={() => setGender("female")}
                    icon="female"
                  />
                </div>

                {errors.gender ? (
                  <p className="text-xs text-red-300">{errors.gender}</p>
                ) : null}
              </div>

              {/* Bio */}
              <div className="space-y-2 text-center">
                <label className="text-xl font-semibold tracking-wide">
                  Qısa məlumat
                </label>
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mx-auto block w-full max-w-[420px] rounded-2xl border border-white/25 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
                />
                {errors.bio ? (
                  <p className="text-xs text-red-300">{errors.bio}</p>
                ) : null}
              </div>

              {/* Instagram */}
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                  <InstagramIcon />
                  <span>instagram</span>
                </div>
                <input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="mx-auto block w-full max-w-[360px] rounded-full border border-white/30 bg-black/35 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
                />
                {errors.instagram ? (
                  <p className="text-xs text-red-300">{errors.instagram}</p>
                ) : null}
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
                  Bura sakit və təhlükəsiz bir məkandır. Bu platforma real məkanda
                  olan insanların, heç bir məcburiyyət olmadan, bir-bir isi ilə əlaqə
                  qurması üçün yaradılıb.
                </p>

                <ul className="list-disc space-y-2 pl-5">
                  <li>Burada tam anonim qalırsan.</li>
                  <li>Adın, nömrən və şəxsi məlumatların paylaşılmır və saxlanılmır.</li>
                  <li>Qarşı tərəf yalnız razılıq verdikdən sonra səni görə və mesajlaşa bilər.</li>
                  <li>Razılıq olmadan heç bir ünsiyyət başlamır.</li>
                  <li>Ünsiyyət jestlər və qısa mesajlar üzərindən qurulur.</li>
                  <li>İstədiyin vaxt cavab verməyə və ya davam etməməyə haqqın var.</li>
                  <li>Sessiya bitdikdə bütün ünsiyyət avtomatik vurulur.</li>
                  <li>Mesajlar silinir, masa deaktiv edilir, heç nə saxlanılmır.</li>
                  <li>Bu məkan hörmət və rahatlıq üzərində qurulub.</li>
                  <li>Narahatlıq yaradan davranışlara yol verilmir.</li>
                </ul>

                {/* Consent */}
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <input
                    id="rules"
                    type="checkbox"
                    checked={acceptedRules}
                    onChange={(e) => setAcceptedRules(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#F2C200]"
                  />
                  <label htmlFor="rules" className="text-sm text-white/80">
                    Qaydalar və gizlilik şərtləri ilə tanış oldum və razıyam.
                    {errors.acceptedRules ? (
                      <span className="mt-1 block text-xs text-red-300">
                        {errors.acceptedRules}
                      </span>
                    ) : null}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky bottom button */}
          <div className="border-t border-white/10 bg-black/30 px-6 py-4 md:px-10">
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className={[
                "w-full rounded-full py-3 text-center text-sm font-semibold text-black shadow-[0_12px_30px_rgba(242,194,0,0.25)]",
                canSubmit
                  ? "bg-[#F2C200] active:scale-[0.99]"
                  : "bg-[#F2C200]/40 text-black/60 cursor-not-allowed",
              ].join(" ")}
            >
              {submitting ? "Yoxlanılır..." : "Qaydalarla razıyam"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function validateAll(input: {
  nickname: string;
  gender: Gender | null;
  bio: string;
  instagram: string;
  acceptedRules: boolean;
}) {
  const errors: Errors = {};

  if (!input.nickname) errors.nickname = "Ləqəb boş ola bilməz.";
  else if (input.nickname.length < 3) errors.nickname = "Ləqəb ən az 3 simvol olmalıdır.";
  else if (input.nickname.length > 20) errors.nickname = "Ləqəb maksimum 20 simvol ola bilər.";

  if (!input.gender) errors.gender = "Cins seçin.";

  if (!input.bio) errors.bio = "Qısa məlumat boş ola bilməz.";
  else if (input.bio.length > 60) errors.bio = "Qısa məlumat maksimum 60 simvol ola bilər.";

  if (input.instagram) {
    // allow @ or plain username
    const ig = input.instagram.startsWith("@") ? input.instagram.slice(1) : input.instagram;
    const ok = /^[a-zA-Z0-9._]{1,30}$/.test(ig);
    if (!ok) errors.instagram = "Instagram istifadəçi adı düzgün deyil.";
  }

  if (!input.acceptedRules) errors.acceptedRules = "Davam etmək üçün razılıq verməlisən.";

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

function GenderButton({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: "male" | "female";
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "h-12 w-14 rounded-md border transition",
        active ? "border-white/70 bg-white/10" : "border-white/25 bg-black/20",
      ].join(" ")}
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

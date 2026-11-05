import React from 'react';
import { StudentInfo, IdCardTemplate } from '../../types';
import { ScannableBarcode } from '../ScannableBarcode';
import { SingleLineText } from '../SingleLineText';

interface NewReferenceTemplateProps {
  studentInfo: StudentInfo;
  side: 'front' | 'back';
  template: IdCardTemplate;
  avatarSide?: 'left' | 'right';
  forwardedRef: React.ForwardedRef<HTMLDivElement>;
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MONTH_NAME_MAP: Record<string, number> = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11
};

export interface ParsedDateParts {
  day: number;
  monthIndex: number; // 0..11
  year: number;
}

/**
 * Parses `validUntil` and ensures it has a matching expiry year synchronized with
 * `academicYear` / `issueDate` if no explicit date is provided.
 */
export function parseMatchingExpiryDate(
  validUntil?: string,
  issueDate?: string,
  academicYear?: string,
  fallbackDay: number = 30,
  fallbackMonthIndex: number = 8
): ParsedDateParts {
  let inferredYear = 2027;
  if (academicYear) {
    const years = academicYear.match(/20\d{2}/g);
    if (years && years.length > 0) {
      inferredYear = parseInt(years[years.length - 1], 10);
    }
  } else if (issueDate) {
    const yMatch = issueDate.match(/20\d{2}/);
    if (yMatch) {
      inferredYear = parseInt(yMatch[0], 10) + 1;
    }
  }

  if (!validUntil || !validUntil.trim()) {
    return { day: fallbackDay, monthIndex: fallbackMonthIndex, year: inferredYear };
  }

  const raw = validUntil.trim();

  // 1. Check DD/MM/YYYY or MM/DD/YYYY or DD-MM-YYYY
  const slashParts = raw.split(/[/.-]/);
  if (slashParts.length === 3) {
    const p0 = slashParts[0].trim();
    const p1 = slashParts[1].trim();
    const p2 = slashParts[2].trim();

    // e.g. 24-Jul-2027
    if (isNaN(Number(p1)) && MONTH_NAME_MAP[p1.toLowerCase()] !== undefined) {
      const d = parseInt(p0, 10) || fallbackDay;
      const m = MONTH_NAME_MAP[p1.toLowerCase()];
      const y = parseInt(p2, 10) || inferredYear;
      return { day: Math.min(31, Math.max(1, d)), monthIndex: m, year: y };
    }

    const n0 = parseInt(p0, 10);
    const n1 = parseInt(p1, 10);
    const n2 = parseInt(p2, 10);
    if (!isNaN(n0) && !isNaN(n1) && !isNaN(n2)) {
      if (n0 > 1900) {
        // YYYY-MM-DD
        return {
          day: Math.min(31, Math.max(1, n2)),
          monthIndex: Math.min(11, Math.max(0, n1 - 1)),
          year: n0
        };
      }
      if (n1 > 12) {
        // MM/DD/YYYY (e.g. 05/31/2027)
        return {
          day: Math.min(31, Math.max(1, n1)),
          monthIndex: Math.min(11, Math.max(0, n0 - 1)),
          year: n2 > 100 ? n2 : 2000 + n2
        };
      }
      // Default DD/MM/YYYY
      return {
        day: Math.min(31, Math.max(1, n0)),
        monthIndex: Math.min(11, Math.max(0, n1 - 1)),
        year: n2 > 100 ? n2 : 2000 + n2
      };
    }
  }

  // 2. Check MM/YYYY (e.g. 08/2027)
  if (slashParts.length === 2) {
    const m = parseInt(slashParts[0], 10);
    const y = parseInt(slashParts[1], 10);
    if (!isNaN(m) && !isNaN(y) && y > 1900) {
      return {
        day: fallbackDay,
        monthIndex: Math.min(11, Math.max(0, m - 1)),
        year: y
      };
    }
  }

  // 3. Check "29 Dec 2027" or "31 DEC 2029"
  const wordMatch = raw.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (wordMatch) {
    const d = parseInt(wordMatch[1], 10);
    const m = MONTH_NAME_MAP[wordMatch[2].toLowerCase()] ?? fallbackMonthIndex;
    const y = parseInt(wordMatch[3], 10);
    return { day: d, monthIndex: m, year: y };
  }

  // 4. Check "Dec 29, 2027"
  const wordMatch2 = raw.match(/([A-Za-z]+)\s+(\d{1,2})[,\s]+(\d{4})/);
  if (wordMatch2) {
    const m = MONTH_NAME_MAP[wordMatch2[1].toLowerCase()] ?? fallbackMonthIndex;
    const d = parseInt(wordMatch2[2], 10);
    const y = parseInt(wordMatch2[3], 10);
    return { day: d, monthIndex: m, year: y };
  }

  return { day: fallbackDay, monthIndex: fallbackMonthIndex, year: inferredYear };
}

const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const splitFirstAndLastName = (fullName: string): { firstNames: string; lastName: string } => {
  const cleaned = (fullName || 'JEAN BROOK').trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) {
    return { firstNames: toTitleCase(parts[0]), lastName: parts[0].toUpperCase() };
  }
  const lastName = parts[parts.length - 1].toUpperCase();
  const firstNames = toTitleCase(parts.slice(0, -1).join(' '));
  return { firstNames, lastName };
};

const deriveDigits = (rawId: string, length: number, prefix: string = ''): string => {
  const digitsOnly = (rawId || '').replace(/\D+/g, '');
  let hash = 0;
  for (let i = 0; i < (rawId || '2026').length; i++) {
    hash = (hash * 31 + (rawId || '2026').charCodeAt(i)) % 1000000000;
  }
  const combined = `${prefix}${digitsOnly}${Math.abs(hash).toString().padStart(9, '4')}`;
  return combined.slice(0, length);
};

/**
 * Generates an acronym (2-4 letters) for monograms, seals, and badges based on the selected school name.
 */
const getSchoolAcronym = (uniName: string, defaultAcronym: string = 'UNI'): string => {
  const cleaned = (uniName || '').replace(/\*$/, '').trim();
  if (!cleaned) return defaultAcronym;
  const lower = cleaned.toLowerCase();
  if (lower.includes('utah state')) return 'USU';
  if (lower.includes('brigham young')) return 'BYU';
  if (lower.includes('durham')) return 'DSU';
  if (lower.includes('elizabeth seton')) return 'ES•HS';
  if (lower.includes('tasmania')) return 'UTAS';
  if (lower.includes('hobart and william smith')) return 'HWS';
  if (lower.includes('harvard')) return 'HU';
  if (lower.includes('brunel')) return 'BUL';
  if (lower.includes('curtin')) return 'CU';

  const stopWords = new Set(['of', 'the', 'and', 'at', 'in', 'for', 'de', 'di', 'la', 'le']);
  const words = cleaned
    .replace(/[^A-Za-z0-9\s-]/g, '')
    .split(/[\s-]+/)
    .filter(w => w.length > 0 && !stopWords.has(w.toLowerCase()));

  if (words.length === 0) return defaultAcronym;
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 4)
    .map(w => w.charAt(0).toUpperCase())
    .join('');
};

/**
 * Splits any school name into a primary prominent line and secondary institutional line
 * (e.g., "HARVARD" + "UNIVERSITY", "WARWICK" + "UNIVERSITY", "COMMUNITY-ED" + "ACADEMY").
 */
const splitPrimaryAndSuffix = (uniName: string): { primary: string; secondary: string } => {
  const cleaned = (uniName || 'Harvard University').replace(/\*$/, '').trim();
  const lower = cleaned.toLowerCase();

  if (lower === 'harvard university') {
    return { primary: 'HARVARD', secondary: 'UNIVERSITY' };
  }
  if (lower === 'brigham young university') {
    return { primary: 'BRIGHAM YOUNG', secondary: 'UNIVERSITY' };
  }
  if (lower === 'durham university') {
    return { primary: 'Durham', secondary: 'University' };
  }
  if (lower === 'utah state university') {
    return { primary: 'UtahState', secondary: 'University' };
  }
  if (lower === 'hobart and william smith colleges') {
    return { primary: 'HOBART AND', secondary: 'WILLIAM SMITH COLLEGES' };
  }
  if (lower === 'elizabeth seton high school') {
    return { primary: 'Elizabeth Seton', secondary: 'High School' };
  }

  // Check "The University of X" or "University of X"
  const uniOfMatch = cleaned.match(/^(?:the\s+)?university\s+of\s+(.+)$/i);
  if (uniOfMatch) {
    return {
      primary: uniOfMatch[1].trim(),
      secondary: 'UNIVERSITY'
    };
  }

  // Check multi-word suffixes like "High School", "Secondary College", "Community College", "Middle School"
  const multiSuffixes = [
    'Secondary College',
    'Community College',
    'Community School',
    'Commercial College',
    'Training College',
    'High School',
    'Middle School',
    'Early Learning Centre',
    'Community Trust'
  ];
  for (const suffix of multiSuffixes) {
    if (lower.endsWith(suffix.toLowerCase()) && cleaned.length > suffix.length) {
      const prefix = cleaned.slice(0, cleaned.length - suffix.length).trim();
      if (prefix) {
        return { primary: prefix, secondary: suffix };
      }
    }
  }

  const words = cleaned.split(/\s+/);
  if (words.length === 1) {
    return { primary: words[0], secondary: 'UNIVERSITY' };
  }
  if (words.length === 2) {
    return { primary: words[0], secondary: words[1] };
  }

  const lastWord = words[words.length - 1];
  if (/^(university|college|colleges|academy|school|institute|gymnasium|berufskolleg)$/i.test(lastWord)) {
    return {
      primary: words.slice(0, -1).join(' '),
      secondary: lastWord
    };
  }

  const mid = Math.ceil(words.length / 2);
  return {
    primary: words.slice(0, mid).join(' '),
    secondary: words.slice(mid).join(' ')
  };
};

/**
 * Splits any school name into two balanced banner lines in natural reading order
 * (e.g., "HOBART AND" / "WILLIAM SMITH COLLEGES", "UNIVERSITY OF" / "TASMANIA").
 */
const splitTwoBalancedLines = (uniName: string): { line1: string; line2: string } => {
  const cleaned = (uniName || 'Hobart and William Smith Colleges').replace(/\*$/, '').trim();
  const lower = cleaned.toLowerCase();

  if (lower === 'hobart and william smith colleges') {
    return { line1: 'HOBART AND', line2: 'WILLIAM SMITH COLLEGES' };
  }
  if (lower === 'elizabeth seton high school') {
    return { line1: 'Elizabeth Seton', line2: 'High School' };
  }
  if (lower === 'brigham young university') {
    return { line1: 'BRIGHAM YOUNG', line2: 'UNIVERSITY' };
  }

  const uniOfMatch = cleaned.match(/^((?:the\s+)?university\s+of)\s+(.+)$/i);
  if (uniOfMatch) {
    return {
      line1: uniOfMatch[1].trim(),
      line2: uniOfMatch[2].trim()
    };
  }

  const { primary, secondary } = splitPrimaryAndSuffix(cleaned);
  return { line1: primary, line2: secondary };
};

// ============================================================================
// 1. UNIVERSITY OF TASMANIA (utas) — 1i5g121y6m.jpg
// ============================================================================
const UtasLionCrest = ({ className = "w-12 h-9" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized Red Tasmanian Lion */}
    <path
      d="M12 18 C16 10, 26 8, 34 12 C42 8, 56 10, 66 14 C60 18, 52 20, 44 22 C54 24, 62 28, 68 32 C58 34, 48 34, 42 36 C46 42, 48 48, 42 54 C36 50, 34 44, 30 40 C24 44, 20 50, 14 52 C14 44, 18 38, 22 34 C14 32, 8 26, 12 18 Z"
      fill="#B91C1C"
    />
    <path
      d="M18 22 C24 18, 36 18, 48 20 M20 28 C28 26, 40 26, 52 29"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="24" cy="18" r="2" fill="#FFFFFF" />
  </svg>
);

// ============================================================================
// 2. BRUNEL UNIVERSITY LONDON (brunel) — 650p0q335y.jpg
// ============================================================================
const BrunelCrestSvg = ({ className = "w-14 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Swan & Crest Top */}
    <path d="M38 22 C35 12, 42 6, 48 10 C52 6, 60 10, 58 20 C62 16, 68 18, 64 26 L36 26 Z" fill="#0B1F3A" />
    <path d="M44 12 C48 8, 54 12, 50 20" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
    {/* Heraldic Mantling Left & Right */}
    <path d="M28 32 C14 28, 10 44, 20 52 C12 58, 16 74, 26 78 C20 84, 26 92, 34 88" stroke="#0B1F3A" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M72 32 C86 28, 90 44, 80 52 C88 58, 84 74, 74 78 C80 84, 74 92, 66 88" stroke="#0B1F3A" strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* Central Shield */}
    <path d="M30 34 H70 V68 C70 86, 50 102, 50 102 C50 102, 30 86, 30 68 V34 Z" fill="#0B1F3A" stroke="#0B1F3A" strokeWidth="2" />
    {/* Shield Mason / Bridge Arch & Compass */}
    <path d="M32 52 Q50 42 68 52" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
    <path d="M36 48 V54 M45 45 V51 M55 45 V51 M64 48 V54" stroke="#0B1F3A" strokeWidth="1.5" />
    <path d="M50 56 L38 88 H43 L50 68 L57 88 H62 L50 56 Z" fill="#FFFFFF" />
    <polygon points="50,76 55,86 50,96 45,86" fill="#CBD5E1" />
  </svg>
);

// ============================================================================
// 4. DURHAM UNIVERSITY (durham) — 303r4n681v.jpg
// ============================================================================
const DurhamShieldSvg = ({ className = "w-9 h-11" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6 H74 V46 C74 72, 40 90, 40 90 C40 90, 6 72, 6 46 V6 Z" fill="#68246D" />
    {/* White Cross */}
    <rect x="34" y="6" width="12" height="82" fill="#FFFFFF" />
    <rect x="6" y="36" width="68" height="12" fill="#FFFFFF" />
    {/* Top-left canton details */}
    <path d="M12 14 L28 30 M28 14 L12 30" stroke="#FFFFFF" strokeWidth="2.5" />
    <circle cx="20" cy="14" r="2" fill="#FFFFFF" />
    <circle cx="13" cy="22" r="2" fill="#FFFFFF" />
    <circle cx="27" cy="22" r="2" fill="#FFFFFF" />
  </svg>
);

// ============================================================================
// 7. BRIGHAM YOUNG UNIVERSITY (byu) — 6o4f1c3r4o.jpg
// ============================================================================
const ByuSealSvg = ({
  className = "w-24 h-24",
  schoolName = "BRIGHAM YOUNG UNIVERSITY",
  location = "PROVO, UTAH",
  acronym = "BYU"
}: {
  className?: string;
  schoolName?: string;
  location?: string;
  acronym?: string;
}) => {
  const topText = (schoolName || 'BRIGHAM YOUNG UNIVERSITY').toUpperCase().slice(0, 28);
  const botText = `• ${(location || 'PROVO, UTAH').toUpperCase().slice(0, 20)} •`;
  const centerCode = (acronym || 'BYU').toUpperCase().slice(0, 4);

  return (
    <svg className={className} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="66" fill="#FAF8F2" stroke="#D4AF37" strokeWidth="2.5" />
      <circle cx="70" cy="70" r="59" fill="#181C24" stroke="#B68D40" strokeWidth="2" />
      <circle cx="70" cy="70" r="41" fill="#FAF8F2" stroke="#B68D40" strokeWidth="2" />
      <path id="byu-top-arc" d="M 22,70 A 48,48 0 1,1 118,70" fill="none" />
      <path id="byu-bot-arc" d="M 118,72 A 48,48 0 1,1 22,72" fill="none" />
      <text fill="#E2E8F0" fontSize={topText.length > 22 ? "6.8" : "8.2"} fontFamily="serif" fontWeight="bold" letterSpacing="0.11em">
        <textPath href="#byu-top-arc" startOffset="50%" textAnchor="middle">
          {topText}
        </textPath>
      </text>
      <text fill="#E2E8F0" fontSize="7.5" fontFamily="serif" fontWeight="bold" letterSpacing="0.14em">
        <textPath href="#byu-bot-arc" startOffset="50%" textAnchor="middle">
          {botText}
        </textPath>
      </text>
      <text x="70" y="53" textAnchor="middle" fill="#181C24" fontSize="6.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="0.08em">
        FOUNDED
      </text>
      <text
        x="70"
        y="77"
        textAnchor="middle"
        fill="#181C24"
        fontSize={centerCode.length > 3 ? "17" : "22"}
        fontFamily="serif"
        fontWeight="900"
        letterSpacing="0.04em"
      >
        {centerCode}
      </text>
      <text x="70" y="94" textAnchor="middle" fill="#181C24" fontSize="8" fontFamily="serif" fontWeight="bold" letterSpacing="0.08em">
        1875
      </text>
    </svg>
  );
};

export const NewReferenceTemplates: React.FC<NewReferenceTemplateProps> = ({
  studentInfo,
  side,
  template,
  avatarSide,
  forwardedRef
}) => {
  const fullName = (studentInfo.studentName || 'JEAN BROOK').trim();
  const { firstNames, lastName } = splitFirstAndLastName(fullName);
  const rawId = (studentInfo.studentId || '219443').trim();
  const photoUrl = studentInfo.photo || '/assets/avatars/female_1.webp';
  const cleanUniName = (studentInfo.universityName || 'University').replace(/\*$/, '').trim();
  const isAvatarLeft = avatarSide === 'left' || studentInfo.avatarSide === 'left';

  // Common clean back side for all 9 new templates, with matching expiry date, current school details, and barcode
  if (side === 'back') {
    const parsedExp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear);
    const expStr = `${String(parsedExp.day).padStart(2, '0')}/${String(parsedExp.monthIndex + 1).padStart(2, '0')}/${parsedExp.year}`;

    return (
      <div
        ref={forwardedRef}
        className="id-card-container id-card-back shadow-xl bg-[#FAFAFA] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900"
      >
        {/* Top Magnetic Stripe */}
        <div className="w-full h-8 bg-[#141417] relative flex-shrink-0 flex items-center justify-end px-4">
          <div className="h-1.5 w-16 bg-white/10 rounded-full" />
        </div>

        {/* Back Body Content */}
        <div className="px-4 py-2 flex-1 flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-1 gap-2">
              <div className="flex-1 min-w-0">
                <SingleLineText fontSize={9.5} className="font-bold uppercase tracking-wider text-neutral-900 text-left">
                  {cleanUniName}
                </SingleLineText>
              </div>
              <span className="font-mono text-[8px] font-bold text-neutral-700 flex-shrink-0">
                EXPIRES: {expStr}
              </span>
            </div>
            <p className="text-[6.8px] text-neutral-600 leading-[1.32]">
              This card is the property of <span className="font-semibold text-neutral-800">{cleanUniName}</span> and is non-transferable. It must be carried at all times while on campus and presented to authorized officials upon request.
            </p>
            {studentInfo.course && (
              <SingleLineText fontSize={6.4} className="font-semibold text-neutral-700 mt-0.5 text-left">
                {`Program: ${studentInfo.course}${studentInfo.academicYear ? ` • Session: ${studentInfo.academicYear}` : ''}`}
              </SingleLineText>
            )}
          </div>

          <div className="flex items-end justify-between gap-3 my-1">
            <div className="flex-1 bg-neutral-100 border border-neutral-200 rounded p-1.5 min-w-0">
              <p className="text-[6px] font-bold uppercase tracking-wider text-neutral-700">
                If found, please return to:
              </p>
              <SingleLineText fontSize={6.2} className="text-neutral-600 text-left">
                {studentInfo.address || 'Student Administration & Campus Security Office'}
              </SingleLineText>
              <SingleLineText fontSize={6} className="text-neutral-500 text-left">
                {`Tel: ${studentInfo.phone || '+1 (800) 555-0199'} • ${studentInfo.website || 'www.university.edu'}`}
              </SingleLineText>
            </div>

            <div className="w-24 flex flex-col items-center flex-shrink-0">
              <div className="w-full h-6 bg-white border border-neutral-300 rounded-[2px] flex items-center justify-center px-1">
                <SingleLineText fontSize={9} className="font-serif italic text-neutral-600 text-center">
                  {`${firstNames.charAt(0)}. ${toTitleCase(lastName)}`}
                </SingleLineText>
              </div>
              <span className="text-[5.5px] uppercase tracking-widest text-neutral-400 mt-0.5">
                Cardholder Signature
              </span>
            </div>
          </div>

          {/* Bottom Scannable Barcode */}
          <div className="pt-1 border-t border-neutral-200 flex items-center justify-between gap-2">
            <ScannableBarcode
              value={rawId}
              className="h-4 w-36 flex-shrink-0"
              fill="#111827"
              showValue={false}
            />
            <div className="flex-1 min-w-0 text-right">
              <SingleLineText fontSize={7} className="font-mono font-bold text-neutral-700 text-right">
                {`ID: ${rawId} • VALID ${expStr}`}
              </SingleLineText>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 1: UNIVERSITY OF TASMANIA (utas) — 1i5g121y6m.jpg
  // ==========================================================================
  if (template === 'utas') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 29, 11);
    const expiryFormatted = `${String(exp.day).padStart(2, '0')} ${MONTHS_SHORT[exp.monthIndex]} ${exp.year}`;
    const displayId = rawId || '219443';
    const barcodeDigits = deriveDigits(displayId, 10, '10018');
    const courseLabel = (studentInfo.course || 'AssocDegArts,BGenStud,UPP,Ur').trim();
    const statusLabel =
      studentInfo.status && !studentInfo.status.toLowerCase().includes('currently enrolled')
        ? studentInfo.status
        : 'Student Full Time';

    const uniOfMatch = cleanUniName.match(/^(?:the\s+)?university\s+of\s+(.+)$/i);
    const { line1: rawLine1, line2: rawLine2 } = splitTwoBalancedLines(cleanUniName);
    const headerTop = uniOfMatch ? 'UNIVERSITY' : rawLine1.toUpperCase();
    const headerBot = uniOfMatch ? uniOfMatch[1].trim().toUpperCase() : rawLine2.toUpperCase();

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#F8F8FA] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900 p-3.5"
      >
        {/* Subtle Warm Tan Diagonal Geometric "T" Watermark across center-right */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 340 214"
          preserveAspectRatio="none"
        >
          <polygon points="122,0 245,0 218,52 148,52" fill="#E5DEC9" opacity="0.55" />
          <polygon points="135,52 195,52 252,214 192,214" fill="#E5DEC9" opacity="0.55" />
        </svg>

        {/* Top Section: UTAS Header + Framed Photo (Switchable Left/Right) */}
        <div className={`relative z-10 flex justify-between items-start gap-2 ${isAvatarLeft ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Header + Divider + Student Details */}
          <div className={`flex-1 flex flex-col min-w-0 ${isAvatarLeft ? 'pl-1' : 'pr-1'}`}>
            {/* Dynamic Serif Wordmark - Centered & Bolded */}
            <div className="flex items-center justify-center pb-2 border-b-[1.5px] border-neutral-700">
              <div className="flex flex-col items-center justify-center leading-none text-center min-w-0 flex-1">
                <div
                  className={`font-serif tracking-[0.06em] text-neutral-950 font-extrabold truncate w-full text-center ${
                    headerTop.length > 16 ? 'text-[10.5px]' : 'text-[13px]'
                  }`}
                >
                  {headerTop} {uniOfMatch ? <span className="italic font-serif font-bold">of</span> : null}
                </div>
                <div
                  className={`font-serif tracking-[0.12em] text-neutral-950 font-extrabold mt-0.5 truncate w-full text-center ${
                    headerBot.length > 16 ? 'text-[10.5px]' : 'text-[13.5px]'
                  }`}
                >
                  {headerBot}
                </div>
              </div>
            </div>

            {/* Student ID & Horizontal Student Name */}
            <div className="pt-2 text-left leading-[1.22] space-y-1">
              <SingleLineText fontSize={10.5} className="font-sans font-bold text-neutral-900 tracking-wide text-left">
                {displayId}
              </SingleLineText>
              <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-neutral-950 tracking-wide leading-tight text-left">
                {toTitleCase(fullName)}
              </SingleLineText>
            </div>
          </div>

          {/* Framed Portrait + Status */}
          <div className="flex flex-col items-center flex-shrink-0 w-[86px]">
            <div className="w-[82px] h-[88px] border-[1.5px] border-neutral-800 bg-neutral-200 overflow-hidden shadow-xs">
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_1.webp'; }}
              />
            </div>
            <SingleLineText fontSize={9.5} className="font-bold text-[#991B1B] tracking-tight leading-tight mt-1 text-center">
              {statusLabel}
            </SingleLineText>
          </div>
        </div>

        {/* Middle Row: Course String on Left + Matching Expiry Date on Right */}
        <div className="relative z-10 flex items-baseline justify-between gap-2 pb-1 border-b-[1.5px] border-neutral-700 -mt-1">
          <div className="flex-1 min-w-0 text-left">
            <SingleLineText fontSize={9.5} className="font-sans font-semibold text-neutral-900 text-left">
              {courseLabel}
            </SingleLineText>
          </div>
          <span className="font-sans font-bold text-[9.5px] text-neutral-900 whitespace-nowrap flex-shrink-0">
            Expiry: {expiryFormatted}
          </span>
        </div>

        {/* Bottom Section: Barcode + Number Centered Underneath */}
        <div className={`relative z-10 pt-1.5 flex items-end justify-between pl-2 pr-1 ${isAvatarLeft ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="flex flex-col items-center">
            <ScannableBarcode
              value={barcodeDigits}
              className="h-7 w-40"
              fill="#111827"
              showValue={false}
            />
            <span className="font-sans text-[9.5px] font-medium text-neutral-900 tracking-wide leading-none mt-0.5">
              {barcodeDigits}
            </span>
          </div>
          {studentInfo.location && (
            <span className="font-sans text-[7.5px] font-semibold text-neutral-500 uppercase tracking-wider truncate max-w-[105px]">
              {studentInfo.location}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 2: BRUNEL UNIVERSITY LONDON (brunel) — 650p0q335y.jpg
  // ==========================================================================
  if (template === 'brunel') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 30, 8);
    const expiryFormatted = `${String(exp.day).padStart(2, '0')}/${String(exp.monthIndex + 1).padStart(2, '0')}/${exp.year}`;
    const displayId = rawId || '2041434';
    const cardNoDigits = deriveDigits(displayId, 9, '5109');
    const levelLabel =
      studentInfo.status && !studentInfo.status.toLowerCase().includes('currently enrolled')
        ? studentInfo.status.toUpperCase()
        : 'POSTGRADUATE';

    // Dynamic 3-line school header + Union circle name
    const isBrunel = cleanUniName.toLowerCase().includes('brunel');
    let line1 = 'Brunel';
    let line2 = 'University';
    let line3 = 'London';
    let unionShort = 'BRUNEL';

    if (!isBrunel) {
      const words = cleanUniName.split(/\s+/);
      if (words.length >= 3) {
        line1 = words[0];
        line2 = words.slice(1, -1).join(' ');
        line3 = words[words.length - 1];
      } else if (words.length === 2) {
        line1 = words[0];
        line2 = words[1];
        line3 = (studentInfo.location || '').split(',')[0].trim() || '';
      } else {
        line1 = cleanUniName;
        line2 = 'University';
        line3 = (studentInfo.location || '').split(',')[0].trim() || '';
      }
      const { primary } = splitPrimaryAndSuffix(cleanUniName);
      unionShort = primary.split(/\s+/)[0].toUpperCase().slice(0, 10);
    }

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#FDFDFD] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900 p-3.5"
      >
        {/* Top Row: Centered & Bolded School Name + Portrait (Switchable Left/Right) */}
        <div className={`flex justify-between items-start gap-2 h-[96px] ${isAvatarLeft ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Header - Centered & Bolded */}
          <div className="flex items-center justify-center h-full pt-0.5 min-w-0 flex-1">
            <div className="w-[1.5px] h-14 bg-[#D9381E] flex-shrink-0" />
            <div className="flex flex-col items-center justify-center text-center leading-[1.08] px-2 min-w-0 flex-1">
              <span
                className={`font-sans font-extrabold text-[#0B1F3A] tracking-tight truncate w-full text-center ${
                  line1.length > 11 ? 'text-[14px]' : 'text-[18px]'
                }`}
              >
                {line1}
              </span>
              {line2 && (
                <span
                  className={`font-sans font-bold text-[#0B1F3A] tracking-tight truncate w-full text-center ${
                    line2.length > 12 ? 'text-[12.5px]' : 'text-[15.5px]'
                  }`}
                >
                  {line2}
                </span>
              )}
              {line3 && (
                <span
                  className={`font-sans font-bold text-[#0B1F3A] tracking-tight truncate w-full text-center ${
                    line3.length > 12 ? 'text-[12px]' : 'text-[15px]'
                  }`}
                >
                  {line3}
                </span>
              )}
            </div>
            <div className="w-[1.5px] h-14 bg-[#D9381E] flex-shrink-0" />
          </div>

          {/* Portrait */}
          <div className={`w-[82px] h-[94px] bg-white overflow-hidden flex-shrink-0 ${isAvatarLeft ? 'ml-1' : 'mr-1'}`}>
            <img
              src={photoUrl}
              alt={fullName}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_1.webp'; }}
            />
          </div>
        </div>

        {/* Bottom Half: Student Name/Course + Union Circle & Level / Card No / Student ID / Expiry */}
        <div className={`flex-1 flex justify-between items-end pt-1 gap-2 ${isAvatarLeft ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Name/Course + Union Circle Column */}
          <div className="flex flex-col justify-between h-full flex-1 min-w-0">
            <div className="pl-2 pr-1 pt-1 text-center w-full min-w-0">
              <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-neutral-950 tracking-wide leading-tight text-center">
                {toTitleCase(fullName)}
              </SingleLineText>
              {studentInfo.course && (
                <SingleLineText fontSize={8.5} className="font-sans font-semibold text-[#0B1F3A]/85 leading-tight mt-1 text-center">
                  {studentInfo.course}
                </SingleLineText>
              )}
            </div>

            {/* Union of Students Circle */}
            <div className={`w-11 h-11 rounded-full bg-[#0B1F3A] flex flex-col items-center justify-center text-white p-1 shadow-xs flex-shrink-0 ${isAvatarLeft ? 'self-end' : 'self-start'}`}>
              <span className="font-sans font-black text-[7.5px] tracking-wider leading-none">
                UNION
              </span>
              <span className="font-sans font-bold text-[3.6px] tracking-wider leading-tight mt-0.5 truncate max-w-[36px]">
                OF {unionShort}
              </span>
              <span className="font-sans font-bold text-[3.8px] tracking-wider leading-none">
                STUDENTS
              </span>
            </div>
          </div>

          {/* Level / Card No / Student ID / Expiry Column */}
          <div className="w-[122px] text-left flex flex-col justify-end leading-[1.16] pb-0.5 flex-shrink-0">
            <div className="font-sans font-bold text-[10px] text-neutral-950 uppercase tracking-wide mb-0.5 truncate">
              {levelLabel}
            </div>
            <div className="text-[8.5px] text-neutral-800 font-medium">Card No:</div>
            <div className="text-[10px] font-sans font-semibold text-neutral-950 pl-3 tabular-nums truncate">
              {cardNoDigits}
            </div>
            <div className="text-[8.5px] text-neutral-800 font-medium mt-0.5">Student ID:</div>
            <div className="text-[10px] font-sans font-semibold text-neutral-950 pl-3 tabular-nums truncate">
              {displayId}
            </div>
            <div className="text-[8.5px] text-neutral-700 font-semibold mt-0.5">
              Expiry: <span className="font-bold text-neutral-950 tabular-nums">{expiryFormatted}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 3: CURTIN UNIVERSITY (curtin) — 4b5p454j2k.jpg
  // ==========================================================================
  if (template === 'curtin') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 31, 11);
    const expiryFormatted = `${String(exp.day).padStart(2, '0')}/${String(exp.monthIndex + 1).padStart(2, '0')}/${exp.year}`;
    const displayId = rawId || '17627250';
    const guildYear = String(exp.year).slice(-2);
    const { primary: shortSchool } = splitPrimaryAndSuffix(cleanUniName);
    const guildName = shortSchool.split(/\s+/)[0].toLowerCase().slice(0, 8) || 'curtin';
    const statusRole =
      studentInfo.status && !studentInfo.status.toLowerCase().includes('currently enrolled')
        ? studentInfo.status.toUpperCase()
        : 'STUDENT';

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#F4F4F5] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900 p-3"
      >
        {/* Top & Middle Section */}
        <div className="flex gap-3 items-start flex-1 min-h-0">
          {/* Left Portrait Photo */}
          <div className="w-[90px] h-[122px] bg-neutral-200 overflow-hidden flex-shrink-0 shadow-xs">
            <img
              src={photoUrl}
              alt={fullName}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_2.webp'; }}
            />
          </div>

          {/* Right Header & Details */}
          <div className="flex-1 flex flex-col justify-between h-full text-left min-w-0">
            {/* Accent Bar + Black School Banner (Centered & Bolded) */}
            <div>
              <div className="flex items-stretch h-8 w-full">
                <div className="w-2.5 bg-[#6E5326] flex-shrink-0" />
                <div className="flex-1 bg-[#18181B] flex items-center justify-center px-2.5 min-w-0">
                  <SingleLineText fontSize={cleanUniName.length > 22 ? 10.5 : 13} className="font-sans font-extrabold text-white tracking-wide text-center">
                    {cleanUniName}
                  </SingleLineText>
                </div>
              </div>

              {/* Bold STUDENT label */}
              <SingleLineText fontSize={14} className="font-sans font-black text-neutral-950 uppercase tracking-wide mt-1 leading-none text-left">
                {statusRole}
              </SingleLineText>
            </div>

            {/* Name, Course, ID & Matching Expiry Date */}
            <div className="leading-[1.18] mt-1 min-w-0">
              <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-neutral-950 tracking-wide leading-tight text-left">
                {toTitleCase(fullName)}
              </SingleLineText>
              {studentInfo.course && (
                <SingleLineText fontSize={8.5} className="font-sans font-semibold text-neutral-700 mt-0.5 text-left">
                  {studentInfo.course}
                </SingleLineText>
              )}
              <SingleLineText fontSize={10.5} className="font-sans font-extrabold text-neutral-950 tabular-nums mt-0.5 text-left">
                {displayId}
              </SingleLineText>
              <div className="font-sans font-bold text-[8.5px] text-neutral-700 mt-0.5">
                EXPIRES: <span className="text-neutral-950 tabular-nums">{expiryFormatted}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Wide Barcode on Left + Yellow Hexagon Sticker & LIS ID on Right */}
        <div className="flex items-end justify-between pt-1 relative">
          <div className="w-[175px] overflow-hidden">
            <ScannableBarcode
              value={`2${displayId.replace(/\s+/g, '')}`}
              className="h-8 w-full"
              fill="#111827"
              showValue={false}
            />
          </div>

          {/* Right Sticker + LIS ID */}
          <div className="flex flex-col items-end justify-end relative">
            {/* Tilted Gold Hexagon Guild Sticker */}
            <div className="w-11 h-11 -mt-5 mr-2 transform -rotate-12 flex items-center justify-center relative">
              <svg className="w-full h-full drop-shadow-xs" viewBox="0 0 60 60">
                <polygon
                  points="30,2 55,15 55,45 30,58 5,45 5,15"
                  fill="#CA9A1C"
                  stroke="#A17712"
                  strokeWidth="1.5"
                />
                <path d="M16 20 C20 24, 20 34, 15 42 M20 26 L26 20 M20 32 L26 38" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />
                <circle cx="15" cy="16" r="2.5" fill="#111827" />
                <text x="36" y="22" textAnchor="middle" fill="#111827" fontSize="5" fontWeight="900">{guildName}</text>
                <text x="36" y="28" textAnchor="middle" fill="#111827" fontSize="5.2" fontWeight="900">student</text>
                <text x="36" y="34" textAnchor="middle" fill="#111827" fontSize="5.2" fontWeight="900">guild</text>
                <text x="34" y="46" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="900">{guildYear}</text>
              </svg>
            </div>
            <div className="font-sans font-bold text-[7.2px] text-neutral-900 tracking-tight mt-0.5 tabular-nums truncate max-w-[125px]">
              LIS ID-EC {displayId}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 4: DURHAM UNIVERSITY (durham) — 303r4n681v.jpg
  // ==========================================================================
  if (template === 'durham') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 30, 5);
    const expiryFormatted = `${String(exp.day).padStart(2, '0')}/${String(exp.monthIndex + 1).padStart(2, '0')}/${exp.year}`;
    const displayId = rawId || '000249997';
    const barcodeNum = `2010430${deriveDigits(displayId, 7, '122')}`;
    const cardNo = `0130${deriveDigits(displayId, 6, '60')}`;
    const loginCode = `${lastName.slice(0, 2).toLowerCase()}${firstNames.slice(0, 2).toLowerCase()}${String(exp.year).slice(-2)}`;
    const { primary: durhamPrimary, secondary: durhamSecondary } = splitPrimaryAndSuffix(cleanUniName);
    const unionBoxCode = getSchoolAcronym(cleanUniName, 'DSU');
    const collegeOrProgram = (studentInfo.course || 'University College').trim();

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#F9FAFB] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900 p-3"
      >
        {/* Top Header Row: Centered & Bolded School Title + NUS Circles + Union Square Logo */}
        <div className={`flex items-start justify-between gap-1 ${isAvatarLeft ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center justify-center min-w-0 flex-1 ${isAvatarLeft ? 'pl-1' : 'pr-1'}`}>
            <div className="flex flex-col items-center justify-center text-center leading-none pt-0.5 min-w-0 flex-1">
              <span
                className={`font-serif font-extrabold text-neutral-950 tracking-tight leading-none truncate w-full text-center ${
                  durhamPrimary.length > 14 ? 'text-[14px]' : 'text-[19px]'
                }`}
              >
                {toTitleCase(durhamPrimary)}
              </span>
              <span className="font-serif font-bold text-[12px] text-neutral-800 tracking-wide mt-0.5 truncate w-full text-center">
                {toTitleCase(durhamSecondary)}
              </span>
            </div>
          </div>

          {/* NUS 3 Red/Orange Circles */}
          <div className="flex items-center gap-1 pt-2 flex-shrink-0">
            {['n', 'u', 's'].map((ch, i) => (
              <div
                key={ch}
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-sans font-medium shadow-2xs"
                style={{
                  background: i === 0 ? '#B91C1C' : i === 1 ? '#DC2626' : '#EF4444'
                }}
              >
                {ch}
              </div>
            ))}
          </div>

          {/* Purple Square Union Logo */}
          <div className="w-10 h-8 border border-[#582C83] bg-white flex items-center justify-center overflow-hidden rounded-[2px] mt-1 flex-shrink-0">
            <span className="font-sans font-black text-[10px] text-[#582C83] transform rotate-25 tracking-tighter">
              {unionBoxCode}
            </span>
          </div>
        </div>

        {/* Lower Section: Name Bar + College/Course + Barcode + Expiry & Portrait (Switchable Left/Right) */}
        <div className={`flex-1 flex gap-2.5 items-stretch pt-1.5 min-h-0 ${isAvatarLeft ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Details Column */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Indigo Name Bar */}
            <div className="w-full bg-[#241973] py-0.5 px-2 text-center shadow-2xs">
              <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-white tracking-wide leading-tight text-center">
                {toTitleCase(fullName)}
              </SingleLineText>
            </div>

            {/* College / Program Name & Student Number / Login Row */}
            <div className="text-center leading-tight my-0.5 min-w-0">
              <SingleLineText fontSize={9.5} className="font-sans font-semibold text-neutral-900 text-center">
                {collegeOrProgram}
              </SingleLineText>
              <div className="flex justify-between items-center text-[9.5px] font-sans font-medium text-neutral-900 px-0.5 mt-0.5 gap-2">
                <span className="tabular-nums">{displayId}</span>
                <span className="flex-shrink-0">{loginCode}</span>
              </div>
            </div>

            {/* Tall Scannable Barcode + 14-digit Number */}
            <div className="w-full flex flex-col items-center">
              <ScannableBarcode
                value={barcodeNum}
                className="h-9 w-full"
                fill="#09090B"
                showValue={false}
              />
              <span className="font-sans text-[8px] font-semibold text-neutral-900 tracking-wide leading-none mt-0.5 tabular-nums">
                {barcodeNum}
              </span>
            </div>

            {/* Bottom Row: Card No. + Matching Expiry */}
            <div className="flex justify-between items-center text-[8px] font-sans font-semibold text-neutral-900 pt-0.5">
              <span>Card No. {cardNo}</span>
              <span>Expiry {expiryFormatted}</span>
            </div>
          </div>

          {/* Portrait Photo */}
          <div className="w-[82px] h-[106px] bg-slate-100 overflow-hidden flex-shrink-0 self-end relative border border-neutral-200">
            <img
              src={photoUrl}
              alt={fullName}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_2.webp'; }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 5: ELIZABETH SETON HIGH SCHOOL (seton) — 656u69492z.jpg
  // ==========================================================================
  if (template === 'seton') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 30, 5);
    const expiryYear = exp.year;
    const startYear = expiryYear - 1;
    const academicSpan =
      studentInfo.academicYear && studentInfo.academicYear.trim()
        ? studentInfo.academicYear.replace('/', '-')
        : `${startYear}-${expiryYear}`;
    const expiryFormatted = `${String(exp.monthIndex + 1).padStart(2, '0')}/${String(exp.day).padStart(2, '0')}/${exp.year}`;
    const displayId = rawId || '23222';
    const { line1: setonLine1, line2: setonLine2 } = splitTwoBalancedLines(cleanUniName);

    // Parse dynamic address into 2 clean lines
    const rawAddr = (studentInfo.address || '5715 Emerson Street, Bladensburg, MD 20710').trim();
    const addrParts = rawAddr.split(',').map(s => s.trim()).filter(Boolean);
    const addrLine1 = addrParts[0] || '5715 Emerson Street';
    const addrLine2 =
      addrParts.length > 1
        ? addrParts.slice(1).join(', ')
        : studentInfo.location || 'Bladensburg, MD 20710';

    const gradeOrProgram =
      studentInfo.course && !studentInfo.course.toLowerCase().includes('bachelor')
        ? studentInfo.course
        : studentInfo.course || 'Grade: 12';

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-white overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900"
      >
        {/* Subtle Campus Building Facade Watermark */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12] z-0" viewBox="0 0 340 214">
          <rect x="10" y="95" width="190" height="80" fill="#94A3B8" />
          <rect x="150" y="80" width="60" height="95" fill="#64748B" />
          {[...Array(7)].map((_, i) => (
            <rect key={i} x={20 + i * 24} y="108" width="14" height="32" fill="#E2E8F0" />
          ))}
        </svg>

        {/* Bottom Subtle Floral / Rose Border Accent */}
        <div
          className="absolute bottom-0 inset-x-0 h-2.5 opacity-35 pointer-events-none z-0"
          style={{
            background: 'repeating-linear-gradient(90deg, #FDA4AF 0px, #FECDD3 12px, #F43F5E 24px, #FFE4E6 36px)'
          }}
        />

        {/* Top Header Strip: Name on Left + ID on Right */}
        <div className="relative z-10 w-full px-3.5 py-1.5 border-b border-neutral-600 flex items-center justify-between bg-white/90 gap-2">
          <div className="flex-1 min-w-0">
            <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-neutral-950 tracking-wide leading-tight text-left">
              {toTitleCase(fullName)}
            </SingleLineText>
          </div>
          <div className="flex items-center gap-2 font-sans text-[11.5px] text-neutral-800 flex-shrink-0">
            <span>ID:</span>
            <span className="font-semibold tabular-nums">{displayId}</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex justify-between px-3 pt-1.5 pb-2 gap-2 min-h-0">
          {/* Left Column: Centered & Bolded School Title, Address, Academic Year, Expiry, Barcode */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-center min-w-0">
                <div
                  className={`font-serif font-extrabold text-[#C53030] leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] truncate w-full text-center ${
                    setonLine1.length > 18 ? 'text-[11.5px]' : 'text-[14px]'
                  }`}
                >
                  {toTitleCase(setonLine1)}
                </div>
                <div
                  className={`font-serif font-extrabold text-[#C53030] leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] truncate w-full text-center ${
                    setonLine2.length > 18 ? 'text-[11px]' : 'text-[13.5px]'
                  }`}
                >
                  {toTitleCase(setonLine2)}
                </div>
                <div className="font-serif text-[7.2px] text-neutral-800 leading-tight mt-1 font-bold text-center">
                  <div className="truncate">{addrLine1}</div>
                  <div className="truncate">{addrLine2}</div>
                </div>
              </div>
            </div>

            {/* Academic Year & Matching Expiry Date */}
            <div className="mt-1 text-left pl-1">
              <div className="font-sans font-extrabold text-[14.5px] text-neutral-800 tracking-wide leading-none tabular-nums">
                {academicSpan}
              </div>
              <div className="font-sans font-bold text-[7.5px] text-neutral-700 mt-0.5">
                Valid Thru: <span className="text-neutral-900 tabular-nums">{expiryFormatted}</span>
              </div>
            </div>

            {/* Bottom Barcode */}
            <div className="pt-1 pl-1">
              <ScannableBarcode
                value={displayId}
                className="h-5 w-38"
                fill="#1F2937"
                showValue={false}
              />
            </div>
          </div>

          {/* Right Column: Portrait Photo on Blue Studio Backdrop + Grade / Course */}
          <div className="w-[96px] flex flex-col items-center justify-between flex-shrink-0">
            <div className="w-[90px] h-[108px] bg-[#1E6091] overflow-hidden border border-neutral-300 shadow-xs">
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_3.webp'; }}
              />
            </div>
            <div
              className="font-sans font-semibold text-neutral-800 leading-[1.08] pt-0.5 text-center w-full break-words"
              style={{
                fontSize: gradeOrProgram.length > 26 ? '6.4px' : gradeOrProgram.length > 16 ? '7.2px' : '8.5px'
              }}
            >
              {gradeOrProgram}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 6: HARVARD UNIVERSITY (harvard) — 1d1r421e59.jpg
  // ==========================================================================
  if (template === 'harvard') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 31, 4);
    const expiryFormatted = `${String(exp.monthIndex + 1).padStart(2, '0')}/${String(exp.day).padStart(2, '0')}/${exp.year}`;
    const displayId = rawId || '90789961 0';
    const barcodeValue = displayId.replace(/\s+/g, '') || '90789961';
    const { primary: harvardPrimary, secondary: harvardSecondary } = splitPrimaryAndSuffix(cleanUniName);
    const topTitle = harvardPrimary.toUpperCase();
    const subTitle = harvardSecondary.toUpperCase();
    const roleLabel =
      studentInfo.status && !studentInfo.status.toLowerCase().includes('currently enrolled')
        ? studentInfo.status.toUpperCase()
        : 'STUDENT';

    const isHarvardSchool = cleanUniName.toLowerCase().includes('harvard');
    const bottomRightCode = isHarvardSchool ? 'GSAS' : getSchoolAcronym(cleanUniName, 'GSAS');

    let topTitleSize = 'text-[24px]';
    if (topTitle.length > 20) topTitleSize = 'text-[12.5px]';
    else if (topTitle.length > 15) topTitleSize = 'text-[15px]';
    else if (topTitle.length > 10) topTitleSize = 'text-[18.5px]';

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#F4F5F7] overflow-hidden relative rounded-xl border border-neutral-300 font-serif select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900 p-3.5"
      >
        {/* Subtle Greyscale Campus Architecture Watermark */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.11] z-0" viewBox="0 0 340 214">
          <rect x="135" y="45" width="24" height="45" fill="#475569" />
          <polygon points="135,45 147,25 159,45" fill="#334155" />
          <rect x="115" y="85" width="70" height="55" fill="#64748B" />
          <rect x="235" y="65" width="85" height="80" fill="#475569" />
          <polygon points="235,65 277,42 320,65" fill="#334155" />
        </svg>

        {/* Top Section: Double-Framed Portrait on Left + Dynamic School Name / STUDENT on Right */}
        <div className="relative z-10 flex items-start gap-3">
          {/* Double-Border Photo Frame */}
          <div className="w-[88px] h-[96px] border-[2px] border-[#0F172A] p-[2px] bg-white flex-shrink-0 shadow-xs">
            <div className="w-full h-full border border-[#0F172A] overflow-hidden bg-neutral-200">
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_3.webp'; }}
              />
            </div>
          </div>

          {/* Right Header */}
          <div className="flex-1 flex flex-col items-center text-center pt-1 min-w-0">
            <div
              className={`font-serif font-bold ${topTitleSize} text-[#9E1B32] tracking-[0.04em] leading-tight break-words w-full`}
              style={{
                textShadow: '0.6px 0.6px 0 #0F172A, -0.4px -0.4px 0 #0F172A'
              }}
            >
              {topTitle}
            </div>
            <div
              className={`font-serif font-semibold text-neutral-900 leading-tight mt-0.5 pl-1 truncate w-full ${
                subTitle.length > 14 ? 'text-[9px] tracking-[0.16em]' : 'text-[10.5px] tracking-[0.32em]'
              }`}
            >
              {subTitle}
            </div>
            <SingleLineText fontSize={15.5} className="font-sans font-bold text-neutral-900 tracking-[0.06em] mt-2 leading-none text-center">
              {roleLabel}
            </SingleLineText>
            {studentInfo.course && (
              <SingleLineText fontSize={8.5} className="font-sans font-semibold text-neutral-700 mt-1 text-center">
                {studentInfo.course}
              </SingleLineText>
            )}
          </div>
        </div>

        {/* Middle Section: Full Uppercase Serif Name + Student ID + SP + VALID THRU ▶ MM/DD/YYYY */}
        <div className="relative z-10 text-left mt-1 min-w-0">
          <SingleLineText fontSize={12} className="font-serif font-bold text-neutral-950 uppercase tracking-wide text-left">
            {fullName.toUpperCase()}
          </SingleLineText>
          <div className="flex items-center justify-between mt-0.5 pr-2 gap-2">
            <div className="flex items-center gap-3 font-serif font-bold text-[11.5px] text-neutral-950 tabular-nums min-w-0">
              <span>{displayId}</span>
              <span className="flex-shrink-0">SP</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="flex flex-col text-[5.5px] font-sans font-bold text-[#9E1B32] leading-[1.05] text-right uppercase">
                <span>VALID</span>
                <span>THRU</span>
              </div>
              <span className="text-[#9E1B32] text-[7px] leading-none">▶</span>
              <span className="font-serif font-bold text-[11.5px] text-neutral-950 tabular-nums">
                {expiryFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Barcode on Left + School/Faculty Code on Right */}
        <div className="relative z-10 flex items-end justify-between pt-1">
          <div className="w-[130px] overflow-hidden">
            <ScannableBarcode
              value={barcodeValue}
              className="h-7 w-full"
              fill="#111827"
              showValue={false}
            />
          </div>
          <div className="font-sans font-bold text-[13.5px] text-neutral-950 tracking-wide pr-2">
            {bottomRightCode}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 7: BRIGHAM YOUNG UNIVERSITY (byu) — 6o4f1c3r4o.jpg
  // ==========================================================================
  if (template === 'byu') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 24, 6);
    const expiryFormatted = `${String(exp.day).padStart(2, '0')}-${MONTHS_SHORT[exp.monthIndex]}-${exp.year}`;
    const displayId = rawId || '879797141 01';
    const { line1: byuLine1, line2: byuLine2 } = splitTwoBalancedLines(cleanUniName);
    const bannerTop = byuLine1.toUpperCase();
    const bannerBot = byuLine2.toUpperCase();
    const sealAcronym = getSchoolAcronym(cleanUniName, 'BYU');
    const microRepeat = Array(5).fill(cleanUniName.toUpperCase()).join(' • ');
    const roleLabel =
      studentInfo.status && !studentInfo.status.toLowerCase().includes('currently enrolled')
        ? toTitleCase(studentInfo.status)
        : 'Student';

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#FAF9F5] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900"
      >
        {/* Top Dark Navy/Black Banner */}
        <div className="w-full h-[64px] bg-[#161920] relative flex items-start justify-center pr-4 pt-2 flex-shrink-0 pl-[118px]">
          <div className="text-center leading-tight w-full min-w-0">
            <div
              className={`font-serif font-bold text-slate-100 tracking-[0.11em] uppercase truncate ${
                bannerTop.length > 18 ? 'text-[10.5px]' : 'text-[13px]'
              }`}
            >
              {bannerTop}
            </div>
            <div
              className={`font-serif font-bold text-slate-200 tracking-[0.2em] uppercase mt-0.5 truncate ${
                bannerBot.length > 18 ? 'text-[9.5px]' : 'text-[11.5px]'
              }`}
            >
              {bannerBot}
            </div>
          </div>
        </div>

        {/* Microtext Security Line Below Banner */}
        <div className="w-full bg-[#FAF9F5] border-t border-neutral-400 text-[4px] font-serif uppercase tracking-[0.15em] text-neutral-600 whitespace-nowrap overflow-hidden leading-none py-[1px]">
          {microRepeat}
        </div>

        {/* Overlapping Circular University Seal in the Right Space */}
        <div className="absolute top-[42px] right-[46px] z-20 drop-shadow-xs">
          <ByuSealSvg
            className="w-[82px] h-[82px]"
            schoolName={cleanUniName}
            location={studentInfo.location || 'PROVO, UTAH'}
            acronym={sealAcronym}
          />
        </div>

        {/* Portrait Photo on Left */}
        <div className="absolute top-[22px] left-4 w-[98px] h-[102px] bg-white border border-neutral-200 shadow-xs overflow-hidden z-10">
          <img
            src={photoUrl}
            alt={fullName}
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_4.webp'; }}
          />
        </div>

        {/* Vertical Right-Edge Red Security Text */}
        <div className="absolute right-1.5 bottom-3 top-[68px] flex items-center justify-center pointer-events-none z-20">
          <span
            className="font-sans font-extrabold text-[6.5px] text-[#B91C1C] uppercase tracking-wider whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            VALID FOR CAMPUS USE ONLY
          </span>
        </div>

        {/* Bottom Body Details: Name, Student/Course (Full Width), ID & EXP Date */}
        <div className="flex-1 flex flex-col justify-end px-4 pb-2.5 pt-14 relative z-10">
          <div className="text-left leading-[1.18] min-w-0 w-full pr-4">
            <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-neutral-950 tracking-wide leading-tight text-left">
              {toTitleCase(fullName)}
            </SingleLineText>
            <SingleLineText fontSize={10} className="font-sans font-bold text-[#6B4E23] text-left">
              {studentInfo.course ? `${roleLabel} • ${studentInfo.course}` : roleLabel}
            </SingleLineText>
            <div className="flex items-baseline justify-between gap-2 mt-0.5">
              <span className="font-sans font-bold text-[10.5px] text-neutral-950 tabular-nums">
                {displayId}
              </span>
              <span className="font-sans font-extrabold text-[11px] text-neutral-950 tabular-nums flex-shrink-0">
                EXP {expiryFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 8: UTAH STATE UNIVERSITY (usu) — 3350531a5z.jpg
  // ==========================================================================
  if (template === 'usu') {
    const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 31, 7);
    const expiryFormatted = `${String(exp.monthIndex + 1).padStart(2, '0')}/${exp.year}`;
    const displayId = rawId || 'A01421183';
    const monogramCode = getSchoolAcronym(cleanUniName, 'USU');
    const { primary: usuPrimary, secondary: usuSecondary } = splitPrimaryAndSuffix(cleanUniName);
    const isUsu = cleanUniName.toLowerCase().includes('utah state');
    const bottomLogoLine1 = isUsu ? 'UtahState' : toTitleCase(usuPrimary);
    const bottomLogoLine2 = isUsu ? 'University' : toTitleCase(usuSecondary);
    const roleLabel =
      studentInfo.status && !studentInfo.status.toLowerCase().includes('currently enrolled')
        ? studentInfo.status.toUpperCase()
        : 'STUDENT';

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900 p-3.5"
        style={{
          background: 'linear-gradient(165deg, #6EA1D4 0%, #B4CFE8 48%, #F8FAFC 100%)'
        }}
      >
        {/* White Old Main Tower Silhouette in Center Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0" viewBox="0 0 340 214">
          <polygon points="188,6 226,56 150,56" fill="#FFFFFF" />
          <text x="188" y="48" textAnchor="middle" fill="#7AA7D2" fontSize="22" fontWeight="900" fontFamily="serif">
            {monogramCode.charAt(0)}
          </text>
          <rect x="144" y="56" width="88" height="158" fill="#FFFFFF" opacity="0.85" />
          <rect x="160" y="72" width="14" height="32" rx="7" fill="#BFD7EA" />
          <rect x="182" y="72" width="14" height="32" rx="7" fill="#BFD7EA" />
          <rect x="204" y="72" width="14" height="32" rx="7" fill="#BFD7EA" />
        </svg>

        {/* Top Section: Giant School Monogram on Left + Blue-Backed Portrait on Right */}
        <div className="relative z-10 flex justify-between items-start">
          {/* Left Monogram CARD Logo */}
          <div className="flex flex-col items-start leading-none">
            <div
              className={`font-sans font-black tracking-[-0.06em] text-[#0A1E46] leading-[0.86] select-none ${
                monogramCode.length > 3 ? 'text-[46px]' : 'text-[56px]'
              }`}
              style={{
                background: 'linear-gradient(180deg, #475569 0%, #0A1E46 65%, #071533 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {monogramCode}
            </div>
            <div className="w-full flex justify-between font-sans font-bold text-[12px] text-[#0A1E46] tracking-[0.85em] pl-1 mt-1">
              <span>C</span>
              <span>A</span>
              <span>R</span>
              <span>D</span>
            </div>
          </div>

          {/* Right Portrait Photo */}
          <div className="w-[82px] h-[98px] bg-[#3B76AD] overflow-hidden shadow-xs flex-shrink-0 border border-white/50">
            <img
              src={photoUrl}
              alt={fullName}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_4.webp'; }}
            />
          </div>
        </div>

        {/* Bottom Section: Full-Width Role/Course Line + Lower Row (Details & Signature on Left + Centered Bolded School Name on Right) */}
        <div className="relative z-10 flex flex-col justify-end pt-1 min-w-0 w-full">
          <SingleLineText fontSize={9.5} className="font-sans font-bold text-neutral-950 uppercase text-left leading-[1.16]">
            {studentInfo.course ? `${roleLabel} • ${studentInfo.course}` : roleLabel}
          </SingleLineText>

          <div className="flex items-end justify-between gap-2 w-full">
            <div className="text-left leading-[1.16] min-w-0 flex-1">
              <SingleLineText fontSize={10} className="font-sans font-bold text-neutral-950 tabular-nums text-left">
                {displayId}
              </SingleLineText>
              <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-neutral-950 tracking-wide leading-tight text-left">
                {toTitleCase(fullName)}
              </SingleLineText>
              <div className="flex items-center gap-3 mt-0.5 min-w-0">
                <span className="font-serif italic text-[11px] text-neutral-900 whitespace-nowrap">
                  {firstNames} {lastName.charAt(0)}.
                </span>
                <span className="font-sans font-bold text-[8px] text-[#0A1E46] tabular-nums flex-shrink-0">
                  EXP: {expiryFormatted}
                </span>
              </div>
              <SingleLineText fontSize={6.2} className="font-sans italic text-neutral-500 mt-0.5 text-left">
                {`For ${cleanUniName} Purposes Only`}
              </SingleLineText>
            </div>

            {/* Bottom-Right University Wordmark - Centered & Bolded */}
            <div className="flex items-end justify-center text-center flex-shrink-0 max-w-[125px]">
              <div className="flex flex-col items-center justify-center leading-tight pb-0.5 text-center min-w-0">
                <SingleLineText fontSize={10.5} className="font-sans font-extrabold text-neutral-950 tracking-tight text-center">
                  {bottomLogoLine1}
                </SingleLineText>
                <SingleLineText fontSize={9.5} className="font-sans font-bold text-neutral-900 tracking-wide text-center">
                  {bottomLogoLine2}
                </SingleLineText>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FRONT 9: HOBART AND WILLIAM SMITH COLLEGES (hws) — 170p6e501a.jpg
  // ==========================================================================
  const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 31, 4);
  const expiryFormatted = `${String(exp.monthIndex + 1).padStart(2, '0')}/${String(exp.day).padStart(2, '0')}/${exp.year}`;
  const displayId = rawId || '10193961';
  const hwsBarcodeDigits = `022021${deriveDigits(displayId, 8, '295')}`;
  const { line1: hwsLine1, line2: hwsLine2 } = splitTwoBalancedLines(cleanUniName);
  const hwsTop = hwsLine1.toUpperCase();
  const hwsBot = hwsLine2.toUpperCase();
  const roleLabel =
    studentInfo.status && !studentInfo.status.toLowerCase().includes('currently enrolled')
      ? studentInfo.status.toUpperCase()
      : 'STUDENT';

  return (
    <div
      ref={forwardedRef}
      className="id-card-container shadow-xl bg-[#CBD5D0] overflow-hidden relative rounded-xl border border-neutral-300 font-serif select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900 p-3"
    >
      {/* Sage-Tinted Aerial Campus Background Illustration & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 52% 42%, #E2ECE7 0%, #B8C7C0 62%, #6E7B76 100%)'
        }}
      />
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-0" viewBox="0 0 340 214">
        <polygon points="120,75 210,65 225,125 130,135" fill="#F1F5F9" stroke="#475569" strokeWidth="1" />
        <polygon points="20,125 115,115 125,155 25,165" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
        <path d="M0,90 Q160,110 340,70 M110,0 Q140,110 180,214" stroke="#F8FAFC" strokeWidth="3" fill="none" />
      </svg>

      {/* Top Row: Centered & Bolded Dynamic School Name */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Center Title */}
        <div
          className="flex-1 text-center leading-tight min-w-0 px-1"
          style={{
            textShadow: '0 0 6px rgba(255,255,255,0.95), 0 0 3px rgba(255,255,255,0.9)'
          }}
        >
          <div
            className={`font-serif font-extrabold text-[#1E296B] uppercase tracking-[0.05em] truncate w-full text-center ${
              hwsTop.length > 22 ? 'text-[10.5px]' : 'text-[13.5px]'
            }`}
          >
            {hwsTop}
          </div>
          <div
            className={`font-serif font-extrabold text-[#1E296B] uppercase tracking-[0.04em] truncate w-full text-center ${
              hwsBot.length > 22 ? 'text-[10.5px]' : 'text-[13.5px]'
            }`}
          >
            {hwsBot}
          </div>
        </div>
      </div>

      {/* Main Content Area: Name, ID, Course, Expiry & White Barcode Box + Framed Photo & STUDENT (Switchable Left/Right) */}
      <div className={`relative z-10 flex-1 flex justify-between items-end gap-2 pt-1 min-h-0 ${isAvatarLeft ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Details Column */}
        <div className="flex-1 flex flex-col justify-between h-full min-w-0">
          <div
            className="text-left pl-1 pt-0.5 leading-[1.18] min-w-0"
            style={{
              textShadow: '0 0 5px rgba(255,255,255,0.95), 0 0 2px rgba(255,255,255,0.9)'
            }}
          >
            <SingleLineText fontSize={13.5} className="font-sans font-extrabold text-neutral-950 tracking-wide leading-tight text-left">
              {toTitleCase(fullName)}
            </SingleLineText>
            <SingleLineText fontSize={11.5} className="font-serif font-bold text-neutral-950 tabular-nums text-left">
              {`ID#${displayId}`}
            </SingleLineText>
            {studentInfo.course && (
              <SingleLineText fontSize={8.5} className="font-sans font-bold text-[#1E296B] mt-0.5 text-left">
                {studentInfo.course}
              </SingleLineText>
            )}
            <div className="font-serif font-bold text-[9.5px] text-neutral-900 tabular-nums mt-0.5">
              EXP: {expiryFormatted}
            </div>
          </div>

          {/* White Box with Barcode */}
          <div className={`bg-white px-2.5 py-1.5 shadow-xs border border-neutral-200 w-[178px] flex flex-col items-center ${isAvatarLeft ? 'self-end' : 'self-start'}`}>
            <ScannableBarcode
              value={hwsBarcodeDigits}
              className="h-7 w-full"
              fill="#111827"
              showValue={false}
            />
            <span className="font-sans text-[8px] font-medium text-neutral-900 tracking-wide leading-none mt-0.5 tabular-nums">
              {hwsBarcodeDigits}
            </span>
          </div>
        </div>

        {/* Portrait Photo + STUDENT Column */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-[88px] h-[100px] bg-white p-[2px] shadow-sm">
            <img
              src={photoUrl}
              alt={fullName}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_5.webp'; }}
            />
          </div>
          <span
            className="font-serif font-normal text-[11px] text-neutral-900 uppercase tracking-[0.06em] leading-none mt-1 max-w-[90px] truncate"
            style={{
              textShadow: '0 0 4px rgba(255,255,255,0.85)'
            }}
          >
            {roleLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

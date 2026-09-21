import React, { useState } from 'react';
import { GenerationHistoryItem, StudentInfo, ToastType } from '../types';
import { History, Undo2, Copy, Check, CheckCircle2 } from 'lucide-react';
import { copyTextToClipboard } from '../lib/clipboard';

interface GenerationHistoryProps {
  history: GenerationHistoryItem[];
  currentStudentInfo: StudentInfo;
  onRestore: (item: GenerationHistoryItem) => void;
  theme: 'light' | 'dark';
  showToast: (message: string, type: ToastType) => void;
}

export const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  history,
  currentStudentInfo,
  onRestore,
  theme,
  showToast
}) => {
  const isDark = theme === 'dark';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!history || history.length === 0) {
    return null;
  }

  // Find index of currently active generation
  const activeIndex = history.findIndex(
    item =>
      item.studentInfo.studentName === currentStudentInfo.studentName &&
      item.studentInfo.studentId === currentStudentInfo.studentId &&
      item.studentInfo.universityName === currentStudentInfo.universityName
  );

  // Identify previous generation if user is on latest (index 0) or another item
  const canGoBack = history.length > 1 && activeIndex !== history.length - 1;
  const previousItem = activeIndex >= 0 && activeIndex < history.length - 1
    ? history[activeIndex + 1]
    : history.length > 1 ? history[1] : null;

  const handleCopy = async (e: React.MouseEvent, item: GenerationHistoryItem) => {
    e.stopPropagation();
    const name = item.studentInfo.studentName;
    const ok = await copyTextToClipboard(name);
    if (ok) {
      setCopiedId(item.id);
      showToast(`Name "${name}" copied to clipboard!`, 'success');
      setTimeout(() => setCopiedId(null), 1800);
    } else {
      showToast('Failed to copy name to clipboard', 'error');
    }
  };

  const handleQuickBack = () => {
    if (previousItem) {
      onRestore(previousItem);
    }
  };

  return (
    <div
      id="generation-history-section"
      className={`rounded-xl p-3 md:p-4 border transition-colors duration-200 mb-4 ${
        isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-slate-50 border-gray-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            <History className="w-4 h-4" />
          </div>
          <div>
            <h4
              className={`text-xs md:text-sm font-bold tracking-tight uppercase ${
                isDark ? 'text-zinc-200' : 'text-gray-800'
              }`}
            >
              Generation History
            </h4>
            <span className={`text-[10px] ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
              Last {history.length} saved (click to restore)
            </span>
          </div>
        </div>

        {canGoBack && previousItem && (
          <button
            onClick={handleQuickBack}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:border-zinc-600'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
            title={`Restore previous: ${previousItem.studentInfo.studentName}`}
          >
            <Undo2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Back to Previous</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {history.map((item, idx) => {
          const isActive =
            item.studentInfo.studentName === currentStudentInfo.studentName &&
            item.studentInfo.studentId === currentStudentInfo.studentId &&
            item.studentInfo.universityName === currentStudentInfo.universityName;

          const isCopied = copiedId === item.id;
          const displayLabel = idx === 0 ? 'Gen #1 (Latest)' : `Gen #${idx + 1}`;

          return (
            <div
              key={item.id}
              onClick={() => onRestore(item)}
              className={`group relative flex flex-col justify-between p-2.5 rounded-lg border cursor-pointer transition-all duration-150 text-left ${
                isActive
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/70 ring-1 ring-emerald-500/50 shadow-sm'
                    : 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-300 shadow-sm'
                  : isDark
                  ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider ${
                    isActive
                      ? isDark
                        ? 'text-emerald-400'
                        : 'text-emerald-700'
                      : isDark
                      ? 'text-zinc-500'
                      : 'text-gray-400'
                  }`}
                >
                  {displayLabel}
                </span>

                {isActive ? (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Active
                  </span>
                ) : (
                  <button
                    onClick={(e) => handleCopy(e, item)}
                    className={`p-1 rounded transition-colors ${
                      isDark
                        ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                        : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    title="Copy Student Name"
                  >
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>

              {/* Student details */}
              <div className="flex items-center gap-2">
                {item.studentInfo.photo ? (
                  <img
                    src={item.studentInfo.photo}
                    alt={item.studentInfo.studentName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-black/10 dark:border-white/10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                      isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.studentInfo.studentName?.charAt(0) || 'S'}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[11px] font-black uppercase truncate tracking-tight ${
                      isDark ? 'text-zinc-100' : 'text-gray-900'
                    }`}
                    title={item.studentInfo.studentName}
                  >
                    {item.studentInfo.studentName || 'Student'}
                  </p>
                  <p
                    className={`text-[10px] truncate ${
                      isDark ? 'text-zinc-400' : 'text-gray-500'
                    }`}
                    title={item.studentInfo.universityName}
                  >
                    {item.studentInfo.universityName || 'Institution'}
                  </p>
                  <p
                    className={`text-[9px] font-mono truncate ${
                      isDark ? 'text-zinc-500' : 'text-gray-400'
                    }`}
                  >
                    ID: {item.studentInfo.studentId || '—'}
                  </p>
                </div>
              </div>

              {/* Restore pill button on hover */}
              {!isActive && (
                <div className="mt-2 pt-1.5 border-t border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-between text-[10px]">
                  <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-semibold group-hover:underline`}>
                    Click to restore
                  </span>
                  {item.template && (
                    <span className={`uppercase font-mono text-[9px] ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
                      {item.template}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

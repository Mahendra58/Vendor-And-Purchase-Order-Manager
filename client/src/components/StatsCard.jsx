import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ value, duration = 800 }) => {
    const [display, setDisplay] = useState(0);
    const prevRef = useRef(0);

    useEffect(() => {
        const start = prevRef.current;
        const end = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, '')) || 0;
        const isString = typeof value === 'string';
        const prefix = isString ? value.replace(/[0-9.,KLM]+/g, '').trim().split(/[0-9]/)[0] || '' : '';

        if (isNaN(end)) {
            setDisplay(value);
            return;
        }

        const startTime = performance.now();
        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);
            setDisplay(current);
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setDisplay(end);
                prevRef.current = end;
            }
        };
        requestAnimationFrame(tick);
    }, [value, duration]);

    // If value is a string (like ₹1.2L), display original after animation
    if (typeof value === 'string') {
        return <>{display === parseFloat(String(value).replace(/[^0-9.-]/g, '')) ? value : display}</>;
    }

    return <>{display.toLocaleString()}</>;
};

const StatsCard = ({ title, value, icon: Icon, trend, color = 'blue', delay = 0 }) => {
    const colorMap = {
        blue: {
            gradient: 'from-blue-500 to-blue-600',
            glow: 'shadow-blue-500/20',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
            text: 'text-blue-700 dark:text-blue-400',
        },
        green: {
            gradient: 'from-emerald-500 to-emerald-600',
            glow: 'shadow-emerald-500/20',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            text: 'text-emerald-700 dark:text-emerald-400',
        },
        amber: {
            gradient: 'from-amber-500 to-amber-600',
            glow: 'shadow-amber-500/20',
            bg: 'bg-amber-50 dark:bg-amber-500/10',
            text: 'text-amber-700 dark:text-amber-400',
        },
        red: {
            gradient: 'from-red-500 to-red-600',
            glow: 'shadow-red-500/20',
            bg: 'bg-red-50 dark:bg-red-500/10',
            text: 'text-red-700 dark:text-red-400',
        },
        purple: {
            gradient: 'from-purple-500 to-purple-600',
            glow: 'shadow-purple-500/20',
            bg: 'bg-purple-50 dark:bg-purple-500/10',
            text: 'text-purple-700 dark:text-purple-400',
        },
        slate: {
            gradient: 'from-slate-500 to-slate-600',
            glow: 'shadow-slate-500/20',
            bg: 'bg-slate-100 dark:bg-slate-500/10',
            text: 'text-slate-700 dark:text-slate-400',
        },
    };

    const c = colorMap[color] || colorMap.blue;

    return (
        <div
            className="card-hover group animate-slide-up"
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                    <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400">{title}</p>
                    <p className="text-[28px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-none">
                        <AnimatedCounter value={value} />
                    </p>
                    {trend && (
                        <p className={`text-xs font-semibold ${c.text} mt-1`}>{trend}</p>
                    )}
                </div>
                <div
                    className={`w-12 h-12 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center shadow-lg ${c.glow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;

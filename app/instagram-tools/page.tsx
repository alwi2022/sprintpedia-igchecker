// app/instagram-tools/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Instagram, Search, Check, AlertTriangle, RotateCw, AtSign, X, Copy, EyeOff, Eye, Globe, ArrowUpRight, Loader2, } from "lucide-react";

type ApiOk = { ok: true; data: any; source?: string; checked_at?: string; debug?: any[] };
type ApiErr = { ok?: false; error: string; sample?: string; debug?: any[] };
type ApiResp = ApiOk | ApiErr;

export default function Page() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [resp, setResp] = useState<ApiResp | null>(null);
    const [showRaw, setShowRaw] = useState(true);
    const [showDbg, setShowDbg] = useState(true);

    const [touched, setTouched] = useState(false);


    function CopyButton({
        id,
        getText,
        className = "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-muted transition",
    }: {
        id: string;
        getText: () => string;
        className?: string;
    }) {
        const [justCopied, setJustCopied] = useState(false);

        async function handleCopy() {
            try {
                await navigator.clipboard.writeText(getText());
                setJustCopied(true);
                const t = setTimeout(() => setJustCopied(false), 1600);
                return () => clearTimeout(t);
            } catch (e) {
                console.error("Copy failed:", e);
            }
        }

        return (
            <button
                type="button"
                onClick={handleCopy}
                aria-live="polite"
                aria-label={justCopied ? "Copied" : "Copy to clipboard"}
                className={className}
            >
                {justCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {justCopied ? "Copied" : "Copy"}
            </button>
        );
    }



    const validate = (v: string) => {
        const raw = v.trim();
        if (!raw) return "Username wajib diisi.";
        if (raw.startsWith("@")) return "Masukkan tanpa simbol @ di depan.";
        if (!/^[a-zA-Z0-9._]+$/.test(raw)) return "Hanya huruf, angka, titik, dan underscore.";
        return null;
    };
    const errMsg = touched ? validate(username) : null;
    const canSubmit = !validate(username) && !loading;

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setTouched(true);
        if (validate(username)) return;
        setLoading(true);
        setResp(null);
        try {
            const r = await fetch("/api/instagram-tools", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim() }),
            });
            const j: ApiResp = await r.json();
            setResp(j);
        } catch (e: any) {
            setResp({ ok: false, error: e?.message || "Gagal memeriksa" });
        } finally {
            setLoading(false);
        }
    }

    const profile = useMemo(() => {
        if (!resp || ("ok" in resp && !resp.ok)) return null;
        const root = (resp as ApiOk).data;
        return root?.data ?? root;
    }, [resp]);



    const statusBar = (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                {(resp as ApiOk)?.source ?? "sprintpedia"}
            </span>
            {(resp as ApiOk)?.checked_at && (
                <>
                    <span aria-hidden="true">•</span>
                    <time className="tabular-nums">{new Date((resp as ApiOk).checked_at!).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</time>
                </>
            )}
        </div>
    );

    return (
        <main className="mx-auto max-w-3xl px-4 sm:px-6 py-6">

            <header className="mb-6">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold leading-tight">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 shrink-0">
                                <Instagram className="h-5 w-5" />
                            </span>
                            <span className="truncate">Instagram Spam Filter Check</span>
                        </h1>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-snug line-clamp-2 sm:line-clamp-none">
                            Pemeriksaan status filter spam & info profil (via Sprintpedia Proxy).
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <a
                            href="https://sprintpedia.id"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Buka Sprintpedia"
                            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted transition"
                        >
                            <Globe className="h-4 w-4" />
                        </a>

                        <a
                            href="https://sprintpedia.id"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted transition whitespace-nowrap"
                        >
                            <Globe className="h-4 w-4" />
                            Sprintpedia
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>
            </header>


            {/* Form Card */}
            <section
                aria-labelledby="formTitle"
                className="rounded-2xl border bg-background/60 shadow-sm ring-1 ring-black/[0.02] backdrop-blur supports-[backdrop-filter]:bg-background/50"
            >
                <div className="border-b p-4 sm:p-5">
                    <h2 id="formTitle" className="text-sm font-medium text-foreground">
                        Cari Username
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Masukkan username Instagram tanpa <code className="rounded bg-muted/60 px-1.5 py-0.5">"@"</code> Contoh:{" "}
                        <span className="font-medium">dapurbuzzer</span>
                    </p>
                </div>

                <form onSubmit={onSubmit} noValidate className="p-4 sm:p-5" aria-busy={loading}>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <label htmlFor="username" className="sr-only">
                                Username Instagram
                            </label>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <AtSign className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <input
                                id="username"
                                inputMode="text"
                                autoComplete="off"
                                aria-invalid={!!errMsg}
                                aria-describedby={errMsg ? "username-error" : undefined}
                                placeholder="username (tanpa @)"
                                className={`w-full rounded-xl border bg-background pl-9 pr-10 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:border-blue-500 ${errMsg ? "border-red-500/60 focus-visible:ring-red-500/50" : "border-muted"}`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={() => setTouched(true)}
                            />
                            {/* Inline clear */}
                            {username && !loading && (
                                <button
                                    type="button"
                                    onClick={() => setUsername("")}
                                    className="group absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground/70 hover:bg-muted hover:text-foreground transition"
                                    aria-label="Hapus input"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <button
                            disabled={!canSubmit}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600/90"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Memeriksa…
                                </>
                            ) : (
                                <>
                                    <Search className="h-4 w-4" />
                                    Get Info
                                </>
                            )}
                        </button>
                    </div>

                    {/* Validation helper */}
                    <div className="min-h-[1.5rem] pt-1">
                        {errMsg ? (
                            <p id="username-error" className="text-xs text-red-600">
                                {errMsg}
                            </p>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                Tekan <kbd className="rounded bg-muted px-1.5 py-0.5 text-[11px]">Enter</kbd> untuk mulai.
                            </p>
                        )}
                    </div>
                </form>
            </section>

            {/* Results */}
            {loading && <SkeletonCard />}

            {!loading && !resp && (
                <EmptyState hint={username ? `Siap memeriksa "${username.trim()}"` : "Masukkan username untuk mulai cek."} />
            )}

            {!loading && resp && (
                <section
                    aria-live="polite"
                    className="mt-6 overflow-hidden rounded-2xl border bg-background shadow-sm ring-1 ring-black/[0.02]"
                >
                    <div className="flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-5">
                        {"ok" in resp && resp.ok ? (
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                                    <Check className="h-4 w-4" />
                                </span>
                                <div className="font-medium text-emerald-700">Berhasil memuat data</div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-600">
                                    <AlertTriangle className="h-4 w-4" />
                                </span>
                                <div className="font-medium text-red-700">
                                    Gagal: {(resp as ApiErr).error || "Terjadi kesalahan"}
                                </div>
                            </div>
                        )}
                        {"ok" in resp && resp.ok && statusBar}
                    </div>

                    {"ok" in resp && resp.ok ? (
                        <>
                            {/* Profile key facts */}
                            <div className="p-4 sm:p-5">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y">
                                        <tbody className="[&>tr>*]:p-3 [&>tr>td:first-child]:text-muted-foreground text-sm">
                                            <InfoRow label="Nama Lengkap" value={profile?.full_name ?? "—"} />
                                            <InfoRow
                                                label="Follower Count"
                                                value={<span className="tabular-nums">{profile?.follower_count ?? 0}</span>}
                                            />
                                            <InfoRow
                                                label="Following Count"
                                                value={<span className="tabular-nums">{profile?.following_count ?? 0}</span>}
                                            />
                                            <InfoRow
                                                label="Post Count"
                                                value={<span className="tabular-nums">{profile?.media_count ?? 0}</span>}
                                            />
                                            <InfoRow
                                                label="Private"
                                                value={
                                                    <Badge tone={profile?.is_private ? "destructive" : "positive"}>
                                                        {profile?.is_private ? "Private ON" : "Private OFF"}
                                                    </Badge>
                                                }
                                            />
                                            <InfoRow
                                                label="Spam Settings"
                                                value={
                                                    <Badge tone={profile?.spam_follower_setting_enabled ? "destructive" : "positive"}>
                                                        {profile?.spam_follower_setting_enabled ? "Spam filter ON" : "Spam filter OFF"}
                                                    </Badge>
                                                }
                                            />
                                            {username && (
                                                <InfoRow
                                                    label="Quick Link"
                                                    value={
                                                        <a
                                                            href={`https://instagram.com/${encodeURIComponent(username.trim())}`}
                                                            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Buka profil <ArrowUpRight className="h-3.5 w-3.5" />
                                                        </a>
                                                    }
                                                />
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Raw JSON */}
                            <div className="border-t">
                                <div className="flex items-center justify-between px-4 py-2 sm:px-5">
                                    <div className="text-sm font-medium">Raw JSON</div>
                                    <div className="flex items-center gap-2">
                                        <CopyButton
                                            id="raw"
                                            getText={() => JSON.stringify((resp as ApiOk).data, null, 2)}
                                        />

                                        <button
                                            className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-muted transition"
                                            onClick={() => setShowRaw((s) => !s)}
                                            type="button"
                                            aria-expanded={showRaw}
                                            aria-controls="raw-json"
                                        >
                                            {showRaw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                            {showRaw ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                                {showRaw && (
                                    <div id="raw-json" className="px-4 pb-4 sm:px-5">
                                        <pre className="max-h-[420px] overflow-auto rounded-lg bg-muted p-3 text-xs leading-relaxed">
                                            {JSON.stringify((resp as ApiOk).data, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        // Error details + sample + debug
                        <div className="p-4 sm:p-5 space-y-4">
                            {(resp as ApiErr).sample && (
                                <div>
                                    <div className="mb-2 text-sm font-medium">Sample (raw)</div>
                                    <pre className="max-h-[320px] overflow-auto rounded-lg bg-muted p-3 text-xs">
                                        {(resp as ApiErr).sample}
                                    </pre>
                                </div>
                            )}

                            {(resp as ApiErr).debug && (
                                <div className="border-t pt-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="text-sm font-medium">Debug Steps</div>
                                        <div className="flex items-center gap-2">
                                            <CopyButton
                                                id="debug"
                                                getText={() => JSON.stringify((resp as ApiErr).debug, null, 2)}
                                            />

                                            <button
                                                className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-muted transition"
                                                onClick={() => setShowDbg((s) => !s)}
                                                type="button"
                                                aria-expanded={showDbg}
                                                aria-controls="debug-steps"
                                            >
                                                {showDbg ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                                {showDbg ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>
                                    {showDbg && (
                                        <pre id="debug-steps" className="max-h-[360px] overflow-auto rounded-lg bg-muted p-3 text-xs">
                                            {JSON.stringify((resp as ApiErr).debug, null, 2)}
                                        </pre>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="text-xs text-muted-foreground">
                                    Tips: pastikan username valid & koneksi stabil.
                                </div>
                                <button
                                    onClick={(e) => onSubmit(e as any)}
                                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs hover:bg-muted transition"
                                >
                                    <RotateCw className="h-3.5 w-3.5" />
                                    Coba Lagi
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            )}

        </main>
    );
}


function InfoRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
    return (
        <tr className="divide-x">
            <td className="w-44 align-top">{label}</td>
            <td className="font-medium">{value}</td>
        </tr>
    );
}

function Badge({ tone, children }: { tone: "positive" | "destructive"; children: React.ReactNode }) {
    const cls =
        tone === "positive"
            ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
            : "bg-red-500/10 text-red-700 ring-1 ring-red-500/20";
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>{children}</span>
    );
}

function SkeletonCard() {

    const line = "h-4 w-full rounded skeleton-base skeleton-shimmer";
    return (
        <section className="mt-6 overflow-hidden rounded-2xl border shadow-sm">
            <div className="border-b px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full skeleton-base skeleton-shimmer" />
                    <div className="h-4 w-40 rounded skeleton-base skeleton-shimmer" />
                </div>
            </div>

            <div className="p-4 sm:p-5">
                <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[11rem,1fr]">
                            <div className="h-4 w-36 rounded skeleton-base skeleton-shimmer" />
                            <div className={line} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t px-4 py-3 sm:px-5">
                <div className="h-4 w-28 rounded skeleton-base skeleton-shimmer" />
                <div className="mt-2 h-28 w-full rounded skeleton-base skeleton-shimmer" />
            </div>
        </section>
    );
}


function EmptyState({ hint }: { hint: string }) {
    return (
        <section className="mt-6 rounded-2xl border bg-gradient-to-b from-muted/50 to-background p-6 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                <Search className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-base font-medium">Siap memeriksa</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{hint}</p>
        </section>
    );
}

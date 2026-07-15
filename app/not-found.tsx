import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-24 text-center">
      <h1 className="font-display text-4xl text-foreground">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-primary underline underline-offset-4">
        Return home
      </Link>
    </div>
  );
}

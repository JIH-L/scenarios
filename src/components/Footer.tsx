export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 py-4 text-center">
      <span className="text-xs">
        © {year} ChatScripter. All rights reserved.
      </span>
    </footer>
  );
}

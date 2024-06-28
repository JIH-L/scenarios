export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center py-4 mt-10">
      <span className="text-xs">
        © {year} ChatScripter. All rights reserved.
      </span>
    </footer>
  );
}

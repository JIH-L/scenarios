export default function GameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="max-w-2xl mx-auto py-12">{children}</section>
    </>
  );
}

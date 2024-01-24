export default function GameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-2xl mx-auto">
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <nav></nav> */}

      {children}
    </section>
  );
}

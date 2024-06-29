export default function ContentLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="mx-auto max-w-2xl py-12">{children}</section>
    </>
  );
}

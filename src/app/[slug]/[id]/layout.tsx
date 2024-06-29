export default function ContentLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <article className="mx-auto mt-10 max-w-2xl">{children}</article>;
}

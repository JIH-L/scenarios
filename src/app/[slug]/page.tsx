export default function ListPage({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  return (
    <>
      <h1>{params.slug}</h1>
      <div>
        <p>Content</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </>
  );
}

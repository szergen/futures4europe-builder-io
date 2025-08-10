export default async function Account({ params }: any) {
  return (
    <>
      <div className="relative">test account page name:</div>
      <div>{params?.slug}</div>
    </>
  );
}

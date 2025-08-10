export default async function FilePage({ params }: any) {
  return (
    <>
      <div className="relative">test File page name:</div>
      <div>{params?.slug}</div>
    </>
  );
}

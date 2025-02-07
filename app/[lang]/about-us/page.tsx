const page = async ({ params }: { params: Promise<{ lang: "en" | "pt" }> }) => {
  const lang = (await params).lang;

  console.log(lang);
  return <div>
    <div className="text-3xl">About Us</div>
    <div className="text-xl w-80 text-center">We are a company that does stuff</div>
  </div>;
};

export default page;
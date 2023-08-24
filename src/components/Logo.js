import LogoImg from "../img/popcornlogo.svg";
export default function Logo() {
  return (
    <div className="logo">
      <img src={LogoImg} alt="popcorn logo" className=" inline-block w-16" />
      <h1 className="font-xl text-white font-bold inline-block ml-[-20px]">
        usePopcorn
      </h1>
    </div>
  );
}

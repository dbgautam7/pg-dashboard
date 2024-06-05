interface Props {
  navTitles: string[];
  activeNav: number;
  setActiveNav?: (i: number) => void;
}

export default function Nav({
  navTitles,
  activeNav,
  setActiveNav = () => undefined,
}: Props) {
  return (
    <nav className="flex flex-grow gap-10 text-[19px] font-medium text-grayText">
      {navTitles.map((navTitle, i) => (
        <button
          key={i}
          className={`${
            activeNav === i ? "text-primary" : "hover:text-blackText"
          } relative flex select-none items-center gap-3 rounded-t pb-1`}
          onClick={() => setActiveNav(i)}
        >
          <span>{navTitle}</span>
        </button>
      ))}
    </nav>
  );
}

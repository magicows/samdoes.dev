import anime from "animejs";

const GRID_WIDTH = 25;
const GRID_HEIGHT = 20;

const DotGrid = () => {
  const handleDotClick = (e: any) => {
    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: e.target.dataset.index,
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="group cursor-crosshair p-2 transition-colors hover:bg-zinc-700/60"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point h-2.5 w-2.5 border border-black bg-gradient-to-b from-[var(--accent-secondary)] to-zinc-100 opacity-70 group-hover:from-[var(--accent-primary)] group-hover:to-[var(--accent-tertiary)]"
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      onClick={handleDotClick}
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="absolute right-[-4%] top-[52%] z-0 grid max-w-[75%] -translate-y-[50%] opacity-80"
    >
      {dots}
    </div>
  );
};

export default DotGrid;

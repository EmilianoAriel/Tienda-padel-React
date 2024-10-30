export default function Pagination({ total, limit }) {
  const btns = Math.ceil(total / limit);

  let btnArray = [];
  for (let i = 0; i < btns; i++) {
    btnArray.push(<button>{i}</button>);
  }

  return <div>{btnArray}</div>;
}

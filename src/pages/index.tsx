import dynamic from "next/dynamic";

const MoniteApp = dynamic(() => import("../MoniteApp"), {
  ssr: false,
});

export default function Index() {
  return (
    <div style={{
      display: 'flex',
      boxSizing: 'border-box',
      height: '100%',
      width: '100%',
      padding: 20,
      position: 'absolute',
      top: 0,
      left: 0,
    }}>
      <MoniteApp />
    </div>
  )
}
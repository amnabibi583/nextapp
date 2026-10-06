const cards = [['Open Alerts', '12'], ['Acknowledged', '28'], ['Resolved', '104']];

export default function Dashboard() {
  return <main className="main"><p className="eyebrow">Patient safety</p><h1>CareAlert Dashboard</h1><p className="lead">Monitor patient-safety alerts, review activity, and keep your care team informed from one calm, focused workspace.</p><section className="cards" aria-label="Alert summary">{cards.map(([label, number]) => <article className="card" key={label}><h2>{label}</h2><p className="number">{number}</p></article>)}</section></main>;
}

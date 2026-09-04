export default function EVStationForm({ form, setForm }) {
  const Field = ({ label, field, type = 'text', options, span }) => (
    <div className={span ? 'col-span-2' : ''}>
      <label className="text-slate-400 text-xs font-medium
        mb-1.5 block">{label}</label>
      {options ? (
        <select
          value={form[field]}
          onChange={e => setForm(f => ({...f, [field]: e.target.value}))}
          className="w-full bg-admin-bg border border-admin-border
            rounded-xl px-4 py-2.5 text-sm text-white
            focus:outline-none focus:border-amber-500/50"
        >
          {options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={form[field]}
          onChange={e => setForm(f => ({...f, [field]: e.target.value}))}
          className="w-full bg-admin-bg border border-admin-border
            rounded-xl px-4 py-2.5 text-sm text-white
            focus:outline-none focus:border-amber-500/50"
        />
      )}
    </div>
  )

  return (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Station Name" field="name" span />
      <Field label="City" field="city" />
      <Field label="Status" field="status"
        options={['Active', 'Coming Soon', 'Maintenance', 'Inactive']} />
      <Field label="Address" field="address" span />
      <Field label="Latitude" field="lat" type="number" />
      <Field label="Longitude" field="lng" type="number" />
      <Field label="Charger Type" field="charger_type"
        options={['Fast', 'Standard', 'Ultra Fast']} />
      <Field label="Power (kW)" field="power_kw" type="number" />
      <Field label="Connectors" field="connectors" type="number" />
      <Field label="Working Hours" field="working_hours" />
      <Field label="Operator Name" field="operator_name" />
      <Field label="Operator Phone" field="operator_phone" />
    </div>
  )
}

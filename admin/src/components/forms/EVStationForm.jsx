// `Field` MUST be defined outside `EVStationForm`, not inside it.
// A component defined inside a parent's render body is re-created (a new
// function reference) on every re-render, so React unmounts and remounts
// the underlying <input>/<select> on every keystroke instead of updating
// it in place — the field loses focus after a single character and looks
// like it "doesn't accept input".
function Field({ label, field, type = 'text', options, span, form, setForm }) {
  return (
    <div className={span ? 'col-span-2' : ''}>
      <label className="text-slate-400 text-xs font-medium
        mb-1.5 block">{label}</label>
      {options ? (
        <select
          value={form[field] ?? ''}
          onChange={e => {
            const val = e.target.value
            setForm(prev => ({ ...prev, [field]: val }))
          }}
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
          value={form[field] ?? ''}
          onChange={e => {
            const val = e.target.value
            setForm(prev => ({ ...prev, [field]: val }))
          }}
          className="w-full bg-admin-bg border border-admin-border
            rounded-xl px-4 py-2.5 text-sm text-white
            focus:outline-none focus:border-amber-500/50"
        />
      )}
    </div>
  )
}

export default function EVStationForm({ form, setForm }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Station Name" field="name" span form={form} setForm={setForm} />
      <Field label="City" field="city" form={form} setForm={setForm} />
      <Field label="Status" field="status"
        options={['Active', 'Coming Soon', 'Maintenance', 'Inactive']}
        form={form} setForm={setForm} />
      <Field label="Address" field="address" span form={form} setForm={setForm} />
      <Field label="Latitude" field="lat" type="number" form={form} setForm={setForm} />
      <Field label="Longitude" field="lng" type="number" form={form} setForm={setForm} />
      <Field label="Charger Type" field="charger_type"
        options={['Fast', 'Standard', 'Ultra Fast']}
        form={form} setForm={setForm} />
      <Field label="Power (kW)" field="power_kw" type="number" form={form} setForm={setForm} />
      <Field label="Connectors" field="connectors" type="number" form={form} setForm={setForm} />
      <Field label="Working Hours" field="working_hours" form={form} setForm={setForm} />
      <Field label="Operator Name" field="operator_name" form={form} setForm={setForm} />
      <Field label="Operator Phone" field="operator_phone" form={form} setForm={setForm} />
    </div>
  )
}

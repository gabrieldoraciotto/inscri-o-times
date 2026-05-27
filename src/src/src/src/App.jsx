import { useState, useEffect } from 'react'
import { supabase } from './supabase'

const initialForm = { teamName: '', members: ['', '', '', ''] }
const MEMBER_LABELS = ['1º Integrante', '2º Integrante', '3º Integrante', '4º Integrante']

export default function App() {
  const [form, setForm] = useState(initialForm)
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [view, setView] = useState('form')

  useEffect(() => { loadTeams() }, [])

  async function loadTeams() {
    setLoading(true)
    const { data, error } = await supabase
      .from('teams').select('*').order('created_at', { ascending: true })
    if (!error) setTeams(data || [])
    setLoading(false)
  }

  function validate() {
    const e = {}
    if (!form.teamName.trim()) e.teamName = 'Informe o nome do time.'
    form.members.forEach((m, i) => { if (!m.trim()) e[`member${i}`] = 'Nome obrigatório.' })
    return e
  }

  async function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSaving(true)
    const duplicate = teams.find(t => t.team_name.toLowerCase() === form.teamName.trim().toLowerCase())
    if (duplicate) { setErrors({ teamName: 'Já existe um time com esse nome.' }); setSaving(false); return }
    const { error } = await supabase.from('teams').insert({
      team_name: form.teamName.trim(),
      member_1: form.members[0].trim(),
      member_2: form.members[1].trim(),
      member_3: form.members[2].trim(),
      member_4: form.members[3].trim(),
    })
    if (!error) {
      await loadTeams()
      setForm(initialForm)
      setErrors({})
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3500)
    } else {
      alert('Erro ao inscrever o time. Tente novamente.')
    }
    setSaving(false)
  }

  function setMember(i, val) {
    const m = [...form.members]
    m[i] = val
    setForm({ ...form, members: m })
    if (errors[`member${i}`]) { const e = { ...errors }; delete e[`member${i}`]; setErrors(e) }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-icon">🏆</div>
        <h1>Inscrição de Times</h1>
        <p>Quarteto — 4 integrantes por time</p>
      </div>

      <div className="tabs">
        <button className={view === 'form' ? 'tab active' : 'tab'} onClick={() => setView('form')}>
          + Inscrever time
        </button>
        <button className={view === 'teams' ? 'tab active' : 'tab'} onClick={() => { setView('teams'); loadTeams() }}>
          Times inscritos {!loading && `(${teams.length})`}
        </button>
      </div>

      {view === 'form' && (
        <div className="card">
          {success && <div className="alert success">✓ Time inscrito com sucesso!</div>}
          <div className="field">
            <label>Nome do time</label>
            <input type="text" placeholder="Ex: Os Invencíveis" value={form.teamName}
              onChange={e => { setForm({ ...form, teamName: e.target.value }); if (errors.teamName) setErrors({ ...errors, teamName: undefined }) }}
              className={errors.teamName ? 'error' : ''} />
            {errors.teamName && <span className="error-msg">{errors.teamName}</span>}
          </div>
          <div className="divider"><span>Integrantes</span></div>
          {MEMBER_LABELS.map((label, i) => (
            <div className="field" key={i}>
              <label>{label}</label>
              <input type="text" placeholder="Nome completo" value={form.members[i]}
                onChange={e => setMember(i, e.target.value)}
                className={errors[`member${i}`] ? 'error' : ''} />
              {errors[`member${i}`] && <span className="error-msg">{errors[`member${i}`]}</span>}
            </div>
          ))}
          <button className="btn-submit" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Inscrevendo...' : 'Inscrever time'}
          </button>
        </div>
      )}

      {view === 'teams' && (
        <div>
          {loading ? <p className="empty">Carregando times...</p>
          : teams.length === 0 ? (
            <div className="empty-box"><span>🏆</span><p>Nenhum time inscrito ainda.</p></div>
          ) : (
            <div className="teams-list">
              {teams.map((team, idx) => (
                <div className="team-card" key={team.id}>
                  <div className="team-header">
                    <div className="team-number">{idx + 1}</div>
                    <span className="team-name">{team.team_name}</span>
                    <span className="team-date">{new Date(team.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="team-members">
                    {[team.member_1, team.member_2, team.member_3, team.member_4].map((m, mi) => (
                      <div className="member" key={mi}><span className="member-dot">•</span>{m}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <p className="footer-note">Inscrições abertas ao público — dados compartilhados entre todos.</p>
    </div>
  )
}
